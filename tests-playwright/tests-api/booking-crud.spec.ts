import { test, expect } from "@playwright/test";
import { data } from '../helpers/constants'

let tokenValue: string;
let createdBookingId: number;

test.describe.serial('CRUD full lifecycle', () => {

  test.beforeAll('[POST] Auth - Create token', async ({ request }) => {
  const response = await request.post('/auth', {
    data: {
      username: data.apiUserName,
      password: data.apiPassword,
    }
  });
  let body = await response.json();
  tokenValue = body.token
    expect(response.status()).toBe(200)
  });
  test('[POST] Create a booking', async ({ request }) => {
  const response = await request.post('/booking', {
      data: {
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: '2018-01-01',
          checkout: '2019-01-01'
        },
        additionalneeds: 'Breakfast'
      }
    });
      let testBody = await response.json();
      createdBookingId = testBody.bookingid

  expect(response.status()).toBe(200)
  });
  test('[GET] Return a specific booking', async ({ request }) => {
  const response = await request.get(`/booking/${createdBookingId}`);

  expect(response.status()).toBe(200)
  });
  test('[PUT] Update a specific booking', async ({ request }) => {
  const response = await request.put(`/booking/${createdBookingId}`, {
      headers: {
        Cookie: `token=${tokenValue}`
      },
      data: {
          "firstname" : "Ronaldo",
      "lastname" : "Nazário",
      "totalprice" : 2222,
      "depositpaid" : true,
      "bookingdates" : {
          "checkin" : "2025-01-01",
          "checkout" : "2026-01-01"
      },
      "additionalneeds" : "Breakfast"
      }
  });

  expect(response.status()).toBe(200)
  });
  test('[DELETE] Delete a specific booking', async ({ request }) => {
  const response = await request.delete(`/booking/${createdBookingId}`, {
      headers: {
        Cookie: `token=${tokenValue}`
      }});

  expect(response.status()).toBe(201)
  });
})
