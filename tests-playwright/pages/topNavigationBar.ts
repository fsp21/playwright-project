import { expect, type Locator, type Page } from '@playwright/test';

export class TopNavigationBar {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly logOutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = this.page.getByRole('link', {name: 'Log In'})
    this.logOutButton = this.page.getByRole('link', {name: 'Log Out'})
  }

  async clickLogIn() {
    await this.loginButton.click();
  }

  async expectLogoutButtonVisible() {
    await expect(this.logOutButton).toBeVisible();
  }

}