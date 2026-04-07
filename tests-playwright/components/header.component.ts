import { expect, type Locator, type Page } from '@playwright/test';

export class Header {
  private readonly page: Page;
  private readonly loginButton: Locator;
  private readonly signUpButton: Locator;
  private readonly logOutButton: Locator;
  private readonly myCartButton: Locator;
  private readonly checkOutButton: Locator;
  private readonly cartProductsCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = this.page.getByRole('link', { name: 'Log In' });
    this.signUpButton = this.page.getByRole('link', { name: 'Sign Up' });
    this.logOutButton = this.page.getByRole('link', { name: 'Log Out' });
    this.myCartButton = this.page.getByRole('link', { name: 'My Cart' });
    this.checkOutButton = this.page.getByRole('link', { name: 'Check Out' });
    this.cartProductsCount = this.page.locator('#cart-target-desktop');
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

  async clickCheckOut() {
    await this.checkOutButton.click();
  }

  async expectLogoutButtonVisible() {
    await expect(this.logOutButton).toBeVisible();
  }

  async expectProductAddedToCart(quantity: number) {
    await expect(this.cartProductsCount).toHaveText(`(${quantity})`);
  }
}
