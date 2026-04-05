import { expect, type Locator, type Page } from '@playwright/test';

export class Header {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly signUpButton: Locator;
  readonly logOutButton: Locator;
  readonly myCartButton: Locator;
  readonly cartProductsCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = this.page.getByRole('link', {name: 'Log In'})
    this.signUpButton = this.page.getByRole('link', {name: 'Sign Up'})
    this.logOutButton = this.page.getByRole('link', {name: 'Log Out'})
    this.myCartButton = this.page.getByRole('link', {name: 'My Cart'})
    this.cartProductsCount = page.locator('#cart-target-desktop');
  }

  async clickLogIn() {
    await this.loginButton.click();
  }

  async clickSignUp() {
    await this.signUpButton.click();
  }

  async clickMyCart() {
    await this.myCartButton.click();
  }

  async expectLogoutButtonVisible() {
    await expect(this.logOutButton).toBeVisible();
  }

  async expectProductAddedToCart(quantity: number) {
    await expect(this.cartProductsCount).toHaveText(`(${quantity})`);
  }
}