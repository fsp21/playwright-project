import { test } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { TopNavigationBar } from '../pages/topNavigationBar';
import { testData } from '../helpers/constants'

const userEmail = testData.userEmail
const userPassword = testData.userPassword

test('Perform login with credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const topNavigationBar = new TopNavigationBar(page);

  await page.goto('https://sauce-demo.myshopify.com');
  await topNavigationBar.clickLogIn();
  
  await loginPage.signInWithCredentials(userEmail, userPassword);
  await topNavigationBar.expectLogoutButtonVisible();
});