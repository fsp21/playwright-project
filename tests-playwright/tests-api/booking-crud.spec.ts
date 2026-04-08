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
const updatedBookingBody = {
  firstname: 'Ronaldo',
  lastname: 'Nazário',
  totalprice: 2222,
  depositpaid: true,
  bookingdates: {
    checkin: '2025-01-01',
    checkout: '2026-01-01',
  },
  additionalneeds: 'Breakfast',
};

test.describe.serial('CRUD full lifecycle', () => {
  test.beforeAll('[POST] Auth - Create token', async ({ request }) => {
    const response = await request.post('/auth', {
      data: {
        username: data.apiUserName,
        password: data.apiPassword,
      },
    });
    let responseBody = await response.json();
    tokenValue = responseBody.token;
    expect(response.status()).toBe(200);
    console.log(responseBody.token)
    expect(typeof responseBody.token).toBe('string');
  });
  test('[POST] Create a booking', async ({ request }) => {
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
  });
  test('[GET] Return a specific booking', async ({ request }) => {
    const response = await request.get(`/booking/${createdBookingId}`);

    expect(response.status()).toBe(200);
    let responseBody = await response.json();
    expect(responseBody).toEqual(bookingBody);
  });
  test('[PUT] Update a specific booking', async ({ request }) => {
    const response = await request.put(`/booking/${createdBookingId}`, {
      headers: {
        Cookie: `token=${tokenValue}`,
      },
      data: updatedBookingBody,
    });

    expect(response.status()).toBe(200);
    let responseBody = await response.json();
    expect(responseBody).toEqual(updatedBookingBody);
  });
  test('[DELETE] Delete a specific booking', async ({ request }) => {
    const response = await request.delete(`/booking/${createdBookingId}`, {
      headers: {
        Cookie: `token=${tokenValue}`,
      },
    });
    expect(response.status()).toBe(201);
  });
  test('[GET] Confirm deleted booking does not exist', async ({ request }) => {
    const response = await request.get(`/booking/${createdBookingId}`);

    expect(response.status()).toBe(404);
  });
});
