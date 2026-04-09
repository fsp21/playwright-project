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
    const createTokenResponse = await request.post('/auth', {
      data: {
        username: data.apiUserName,
        password: data.apiPassword,
      },
    });
    const createTokenResponseBody = await createTokenResponse.json();
    tokenValue = createTokenResponseBody.token;
    expect(createTokenResponse.status()).toBe(200);
    expect(typeof createTokenResponseBody.token).toBe('string');
  });
  test('[POST] Create a booking', async ({ request }) => {
    const createBookingResponse = await request.post('/booking', {
      data: bookingBody,
    });
    const createBookingResponseBody = await createBookingResponse.json();
    createdBookingId = createBookingResponseBody.bookingid;

    expect(createBookingResponse.status()).toBe(200);
    expect(createBookingResponseBody).toEqual({
      bookingid: createBookingResponseBody.bookingid,
      booking: bookingBody,
    });
  });
  test('[GET] Return a specific booking', async ({ request }) => {
    const returnBookingResponse = await request.get(`/booking/${createdBookingId}`);

    expect(returnBookingResponse.status()).toBe(200);
    const returnBookingResponseBody = await returnBookingResponse.json();
    expect(returnBookingResponseBody).toEqual(bookingBody);
  });
  test('[PUT] Update a specific booking', async ({ request }) => {
    const updateBookingResponse = await request.put(`/booking/${createdBookingId}`, {
      headers: {
        Cookie: `token=${tokenValue}`,
      },
      data: updatedBookingBody,
    });

    expect(updateBookingResponse.status()).toBe(200);
    const updateBookingResponseBody = await updateBookingResponse.json();
    expect(updateBookingResponseBody).toEqual(updatedBookingBody);
  });
  test('[DELETE] Delete a specific booking', async ({ request }) => {
    const deleteBookingResponse = await request.delete(`/booking/${createdBookingId}`, {
      headers: {
        Cookie: `token=${tokenValue}`,
      },
    });
    expect(deleteBookingResponse.status()).toBe(201);
  });
  test('[GET] Confirm deleted booking does not exist', async ({ request }) => {
    const getBookingResponse = await request.get(`/booking/${createdBookingId}`);

    expect(getBookingResponse.status()).toBe(404);
  });
});
