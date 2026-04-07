import { test } from '@playwright/test';
import { SideBar } from '../components/sideBar.component';
import { Header } from '../components/header.component';
import { CatalogPage } from '../pages/catalogPage';
import { CartPage } from '../pages/cartPage';
import { CheckOutPage } from '../pages/checkoutPage';
import { ProductDetailsPage } from '../pages/productDetailsPage';
import { data } from '../helpers/constants';

const expirationDate = data.creditCardExpirationDate;
const securityCode = data.creditCardSecurityCode;

test.beforeEach('Add to cart and click checkout flow', async ({ page }) => {
  const sideBar = new SideBar(page);
  const catalogPage = new CatalogPage(page);
  const header = new Header(page);
  const cartPage = new CartPage(page);
  const productDetailsPage = new ProductDetailsPage(page);

  await page.goto('/');
  await sideBar.clickCatalogButton();
  await sideBar.expectCatalogPageTitle();

  await catalogPage.clickProduct('Noir jacket');

  await productDetailsPage.addProductFlow({
    productSize: 'L',
    colorName: 'Red',
  });
  await header.expectProductAddedToCart(1);

  await header.clickCheckOut();
  await cartPage.expectCheckOutButtonEnabled();
  await cartPage.clickCheckOutButton();
});

test('Successful checkout', async ({ page }) => {
  const checkoutPage = new CheckOutPage(page);
  const cardNumber = data.creditCardNumber;

  await checkoutPage.fillDeliveryAddressInfo({
    email: 'test@abc.com',
    firstName: 'FirstName',
    lastName: 'LastName',
    company: 'Old Blue',
    country: 'Netherlands',
    address: 'WTC Almere, Level 25',
    postalCode: '1300 CH',
    city: 'Almere',
    phone: '+31 6 12345678',
  });

  await checkoutPage.fillPaymentInfo({
    cardNumber: cardNumber,
    expirationDate: expirationDate,
    securityCode: securityCode,
  });

  await checkoutPage.clickPayNow();
  await checkoutPage.expectPaymentSuccessful();
});

test('Verify invalid card fails checkout', async ({ page }) => {
  const checkoutPage = new CheckOutPage(page);
  const invalidCardNumber = data.invalidCreditCardNumber;

  await checkoutPage.fillDeliveryAddressInfo({
    email: 'test@abc.com',
    firstName: 'FirstName',
    lastName: 'LastName',
    company: 'Old Blue',
    country: 'Netherlands',
    address: 'WTC Almere, Level 25',
    postalCode: '1300 CH',
    city: 'Almere',
    phone: '+31 6 12345678',
  });

  await checkoutPage.fillPaymentInfo({
    cardNumber: invalidCardNumber,
    expirationDate: expirationDate,
    securityCode: securityCode,
  });

  await checkoutPage.clickPayNow();
  await checkoutPage.expectPaymentUnsuccessful();
});
