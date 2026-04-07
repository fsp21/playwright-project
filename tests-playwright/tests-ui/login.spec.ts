import { test } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { Header } from '../components/header.component';
import { data } from '../helpers/constants';

const userEmail = data.userEmail;
const userPassword = data.userPassword;

test.skip('Perform login with credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const header = new Header(page);

  await page.goto('/');
  await header.clickLogIn();

  await loginPage.signInWithCredentials(userEmail, userPassword);
  await header.expectLogoutButtonVisible();
});
