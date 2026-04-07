import { test, expect } from '@playwright/test';
import { data } from '../helpers/constants';

let tokenValue: string;

test.describe.serial('Authenticated failed scenarios', () => {
  test.beforeAll('[POST] Auth - Create token', async ({ request }) => {
    const response = await request.post('/auth', {
      data: {
        username: data.apiUserName,
        password: data.apiPassword,
      },
    });
    let body = await response.json();
    tokenValue = body.token;
    expect(response.status()).toBe(200);
  });
  test('[POST] Fail to create a booking with missing required field', async ({
    request,
  }) => {
    const response = await request.post('/booking', {
      data: {
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: '2018-01-01',
          checkout: '2019-01-01',
        },
        additionalneeds: 'Breakfast',
      },
    });

    expect(response.status()).toBe(500);
  });
});
