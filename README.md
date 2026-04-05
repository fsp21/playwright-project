# NB-project

This project was built as a demo exercise to illustrate a Playwright test project, which includes UI and API tests and support files/structures.

Login and Signup tests are being skipped due to bot protection recognizing Playwright's automation flags

## Test Payment Credentials

This project uses Shopify's Bogus Gateway for checkout testing (integrated into https://sauce-demo.myshopify.com/checkouts)

| Field         | Value                  |
|---------------|------------------------|
| Card number   | `1` (success), `2` (failure), `3` (gateway error) |
| Name on card  | Any two words          |
| Expiry date   | Any future date        |
| Security code | Any 3 digits           |

Source: [Shopify Help Center – Activating a payment gateway in test mode](https://help.shopify.com/en/manual/checkout-settings/test-orders/payments-test-mode)