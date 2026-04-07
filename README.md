# playwright-project
Built with:

[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This project was built as a demo exercise to illustrate a Playwright test project, which includes UI and API tests and support files/structures.

## Planned and executed UI tests

Currently there are 4 effective tests being executed covering relevant flows, namely add to cart, complete checkout (including failure check) and verifying sold-out items behavior. Login and Signup tests are being skipped due to bot protection recognizing Playwright's automation flags.

Further checks can be implemented if we can control the data, such as the price/sum, cart content, other pages and etc.

## Test Payment Credentials

This project uses Shopify's Bogus Gateway for checkout testing (integrated into https://sauce-demo.myshopify.com/checkouts). 1 = success, 2 = failure and 3 = gateway error (https://help.shopify.com/en/manual/checkout-settings/test-orders/payments-test-mode)

