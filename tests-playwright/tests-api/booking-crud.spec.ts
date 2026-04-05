import { test, request } from "@playwright/test";

let tokenValue: string
let realBookingId: number;

test.beforeAll('post test', async ({ request }) => {
 const response = await request.post('/auth', {
  data: {
    username: 'admin',
    password: 'password123',
  }
});
 let body = await response.json();
 tokenValue = body.token
})

test('create booking test', async ({ request }) => {
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
    realBookingId = testBody.bookingid
console.log(response.status())
})

test('get booking test', async ({ request }) => {
const response = await request.get(`/booking/${realBookingId}`);
console.log(response.status())
})

test('update booking test', async ({ request }) => {
const response = await request.put(`/booking/${realBookingId}`, {
    headers: {
      Cookie: `token=${tokenValue}` // now accessible here
    },
    data: {
        "firstname" : "James",
    "lastname" : "PLALDPGFSAKFPADSOK",
    "totalprice" : 2222,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2025-01-01",
        "checkout" : "2026-01-01"
    },
    "additionalneeds" : "Breakfast"
    }
});
console.log(response.status())
})

test('delete booking test', async ({ request }) => {
const response = await request.delete(`/booking/${realBookingId}`, {
    headers: {
      Cookie: `token=${tokenValue}` // now accessible here
    }});
console.log(response.status())
})