import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailAddressField: Locator;
  readonly passwordField: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailAddressField = page.getByLabel('Email Address');
    this.passwordField = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', {name: 'Sign in'})
  }

  async signInWithCredentials(userEmail: string, userPassword: string) {
    await this.emailAddressField.fill(userEmail);
    await this.passwordField.fill(userPassword);
    await this.signInButton.click();
  }

}