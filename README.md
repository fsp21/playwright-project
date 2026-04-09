# playwright-project

Built with:

[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This project was built as a demo exercise to illustrate how I'd go about setting up a Playwright test project, which includes UI and API tests with its necessary support files/structures. The target services are the website https://sauce-demo.myshopify.com for UI tests and the https://restful-booker.herokuapp.com/apidoc/index.html for the API side.

# Architecture decisions

I've opted to use the POM pattern, with file differentiation between actual pages and components in the case of UI tests, no basePage (not enough tests to justify the overhead) and separation between action and assert methods.

Minimal dependency setup: only Playwright, support packages (dotenv, node type annotation) and Prettier for quick and standardized formatting.

Since this is a reasonably small project, I've set Playwright configuration file with modest specs:

- 1 worker for practical reasons (exploring with 2 made me hit 'bot' protection features in the website way too fast)
- 1 retry in CI (to workaround intermittent failures outside of our control - still important to monitor if any tests are flaky due to implementation issues)
- 'list' reporter for better CI monitoring
- Only Chrome browser for faster setup time

`.env` file contains "sensitive" credentials and naturally is not committed to github, they're available as repository secrets for GHA (realistically we'd share the file through controlled and safe methods)

### CI

For CI testing, I'm using GHA and I heavily prefer the reusable workflow pattern, where a main workflow contains all the logic, setup and configs, and subsequent "call" workflows can be created on demand. That way we can isolate conditions, triggers and specific logic for given scenarios (e.g.: changes targeting specific files, execute after all merges, trigger with labels, etc).

Given the project is small, I've setup only one trigger: after every push to main branch.

I've opted to cache the npm download cache and Playwright browsers for faster CI execution (both keyed to refresh on `package-lock.json` changes).

## Project structure

```bash
.github/workflows/
  base-playwright-workflow.yml    # Reusable workflow with test logic
  on-push-playwright-workflow.yml # Trigger: push to main
tests-playwright/
  tests-ui/          # UI specs
  tests-api/         # API specs
  pages/             # Page objects
  components/        # Page object components
  helpers/            # Env constants
```

## Setup

```bash
git clone https://github.com/fsp21/playwright-project.git
cd playwright-project
npm install
npx playwright install
```

A `.env` file is required at the root of the project -- see `.env.example` for the required variables

## To execute tests

Entire suite:

```bash
npm run test
```

UI tests:

```bash
npm run test:ui
```

API tests:

```bash
npm run test:api
```

## Planned and executed UI tests

Currently there are 4 tests implemented covering relevant flows, namely:

- add a product to cart
- add a product and complete checkout
- add a product and fail to complete checkout when using invalid payment info
- verify sold-out items can't be added to cart

Login and Signup tests are being skipped due to bot protection recognizing Playwright's automation flags. In a real world situation, we could workaround the bot protection by simply disabling it in test environments or whitelisting specific user-agents.

## Planned and executed API tests

I've added 12 tests to cover what I considered most critical for this simple service. We have:

- the CRUD full lifecycle
- negative scenarios to cover requests with invalid or incomplete bodies, missing or invalid tokens and targeting inexistent records
- body assertions included to verify the full response structure and values

## What I'd add with more time and control of the systems under test

- Test data management could be improved by generating unique data each run instead of hardcoded objects, using factory pattern or real APIs to create users, orders or products
- Cross-browser validation (chose not to for practical reasons)
- Dockerfile and compose setup for 1 command build+execution and reproducibility
- UI: more scenarios could be added covering additional flows, such as more cart interactions (editing quantity, removing items, clearing cart), navigation and content assertion for other pages (external links) and search functionality
- API: additional test suite dedicated to contract testing, another for performance validation

## Test Payment Credentials

In case you wondered how to actually checkout with payment information, the website uses Shopify's Bogus Gateway for testing (integrated into the checkout flow). That provides us specific values to mimic successful and unsuccessful scenarios: credit card number 1 = success, 2 = failure (https://help.shopify.com/en/manual/checkout-settings/test-orders/payments-test-mode)
