import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly emailAddressField: Locator;
  private readonly passwordField: Locator;
  private readonly signInButton: Locator;

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