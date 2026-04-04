import { test } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { TopNavigationBar } from '../pages/topNavigationBar';
import { data } from '../helpers/constants'

const userEmail = data.userEmail
const userPassword = data.userPassword

test('Perform login with credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const topNavigationBar = new TopNavigationBar(page);

  await page.goto('/');
  await topNavigationBar.clickLogIn();
  
  await loginPage.signInWithCredentials(userEmail, userPassword);
  await topNavigationBar.expectLogoutButtonVisible();
});