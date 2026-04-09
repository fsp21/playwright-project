import { test, expect } from '@playwright/test';
import { data } from '../helpers/constants';

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

  test('[POST] Fail to create a booking with missing required field', async ({
    request,
  }) => {
    const createBookingResponse = await request.post('/booking', {
      data: { body: 'fake body' },
    });

    expect(createBookingResponse.status()).toBe(500);
  });
  test('[POST] Fail to create token with invalid credentials', async ({
    request,
  }) => {
    const createTokenResponse = await request.post('/auth', {
      data: {
        username: 'test',
        password: 'password',
      },
    });
    const createTokenResponseBody = await createTokenResponse.json();
    expect(createTokenResponseBody.reason).toBe('Bad credentials');
  });
  test('[PUT] Fail to update without token', async ({ request }) => {
    const createBookingResponse = await request.post('/booking', {
      data: bookingBody,
    });
    const createBookingResponseBody = await createBookingResponse.json();
    const createdBookingId = createBookingResponseBody.bookingid;

    expect(createBookingResponse.status()).toBe(200);
    expect(createBookingResponseBody).toEqual({
      bookingid: createBookingResponseBody.bookingid,
      booking: bookingBody,
    });

    const updateBookingResponse = await request.put(`/booking/${createdBookingId}`, {
      data: bookingBody,
    });

    expect(updateBookingResponse.status()).toBe(403);
  });
  test('[PUT] Fail to update with invalid token', async ({ request }) => {
    const createBookingResponse = await request.post('/booking', {
      data: bookingBody,
    });
    const createBookingResponseBody = await createBookingResponse.json();
    const createdBookingId = createBookingResponseBody.bookingid;

    expect(createBookingResponse.status()).toBe(200);
    expect(createBookingResponseBody).toEqual({
      bookingid: createBookingResponseBody.bookingid,
      booking: bookingBody,
    });

    const updateBookingResponse = await request.put(`/booking/${createdBookingId}`, {
      headers: {
        Cookie: 'token=abc',
      },
      data: bookingBody,
    });

    expect(updateBookingResponse.status()).toBe(403);
  });
  test('[PUT] Fail to update due to incorrect body', async ({ request }) => {
    const createAuthResponse = await request.post('/auth', {
      data: {
        username: data.apiUserName,
        password: data.apiPassword,
      },
    });
    const createAuthResponseBody = await createAuthResponse.json();
    const tokenValue = createAuthResponseBody.token;
    expect(createAuthResponse.status()).toBe(200);
    expect(typeof createAuthResponseBody.token).toBe('string');

    const createBookingResponse = await request.post('/booking', {
      data: bookingBody,
    });
    const createBookingResponseBody = await createBookingResponse.json();
    const createdBookingId = createBookingResponseBody.bookingid;

    expect(createBookingResponse.status()).toBe(200);
    expect(createBookingResponseBody).toEqual({
      bookingid: createBookingResponseBody.bookingid,
      booking: bookingBody,
    });

    const updateBookingResponse = await request.put(`/booking/${createdBookingId}`, {
      headers: {
        Cookie: `token=${tokenValue}`,
      },
      data: { wrongBody: 'a' },
    });

    expect(updateBookingResponse.status()).toBe(400);
  });
  test('[DELETE] Fail to delete with invalid token', async ({ request }) => {
    const createBookingResponse = await request.post('/booking', {
      data: bookingBody,
    });
    const createBookingResponseBody = await createBookingResponse.json();
    const createdBookingId = createBookingResponseBody.bookingid;

    expect(createBookingResponse.status()).toBe(200);
    expect(createBookingResponseBody).toEqual({
      bookingid: createBookingResponseBody.bookingid,
      booking: bookingBody,
    });
    const deleteBookingResponse = await request.delete(`/booking/${createdBookingId}`, {
      headers: {
        Cookie: 'token=abc123',
      },
    });
    expect(deleteBookingResponse.status()).toBe(403);
  });
  test('[DELETE] Fail to delete inexistent booking', async ({ request }) => {
    const createAuthResponse = await request.post('/auth', {
      data: {
        username: data.apiUserName,
        password: data.apiPassword,
      },
    });
    const createAuthResponseBody = await createAuthResponse.json();
    const tokenValue = createAuthResponseBody.token;
    expect(createAuthResponse.status()).toBe(200);
    expect(typeof createAuthResponseBody.token).toBe('string');

    const deleteBookingResponse = await request.delete(`/booking/1122334455`, {
      headers: {
        Cookie: `token=${tokenValue}`,
      },
    });
    expect(deleteBookingResponse.status()).toBe(405);
  });
