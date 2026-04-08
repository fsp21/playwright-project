import { test, expect } from '@playwright/test';
import { data } from '../helpers/constants';

let tokenValue: string;
let createdBookingId: number;
const bookingBody = {
  firstname: 'Jim',
  lastname: 'Brown',
  totalprice: 111,
  depositpaid: true,
  bookingdates: {
    checkin: '2018-01-01',
    checkout: '2019-01-01',
  },
  additionalneeds: 'Breakfast',
};

test.describe.serial('Authenticated failed scenarios', () => {
  test('[POST] Fail to create a booking with missing required field', async ({
    request,
  }) => {
    const response = await request.post('/booking', {
      data: bookingBody,
    });

    expect(response.status()).toBe(500);
  });
  test('[POST] Fail to create token with invalid credentials', async ({
    request,
  }) => {
    const response = await request.post('/auth', {
      data: {
        username: 'test',
        password: 'password',
      },
    });
    let responseBody = await response.json();
    expect(responseBody.reason).toBe('Bad credentials');
  });
  test('[PUT] Fail to update without token', async ({ request }) => {
    const response = await request.post('/booking', {
      data: bookingBody,
    });
    let responseBody = await response.json();
    createdBookingId = responseBody.bookingid;

    expect(response.status()).toBe(200);
    expect(responseBody).toEqual({
      bookingid: responseBody.bookingid,
      booking: bookingBody,
    });

    const updateResponse = await request.put(`/booking/${createdBookingId}`, {
      headers: {
        Cookie: 'token=abc',
      },
      data: bookingBody,
    });

    expect(updateResponse.status()).toBe(403);
  });
  test('[PUT] Fail to update due to incorrect body', async ({ request }) => {
    const response = await request.post('/auth', {
      data: {
        username: data.apiUserName,
        password: data.apiPassword,
      },
    });
    let responseBody = await response.json();
    tokenValue = responseBody.token;
    expect(response.status()).toBe(200);
    expect(typeof responseBody.token).toBe('string');

    const updateResponse = await request.put(`/booking/${createdBookingId}`, {
      headers: {
        Cookie: `token=${tokenValue}`,
      },
      data: { wrongBody: 'a' },
    });

    expect(updateResponse.status()).toBe(400);
  });
});
