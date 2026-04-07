import { test } from '@playwright/test';
import { SignUpPage } from '../pages/signUp';
import { Header } from '../components/header.component';
import { data } from '../helpers/constants';

const userEmail = data.userEmail;
const userPassword = data.userPassword;

test.skip('Sign up with already existent email and verify failure', async ({
  page,
}) => {
  const signUpPage = new SignUpPage(page);
  const header = new Header(page);

  await page.goto('/');
  await header.clickSignUp();

  await signUpPage.signUp(userEmail, userPassword);
  await signUpPage.expectEmailAlreadyInUseMessage();
});
