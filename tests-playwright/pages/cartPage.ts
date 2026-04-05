import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly checkOutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkOutButton = this.page.getByRole('button', {name: 'Check out'});
  }
  
  async clickCheckOutButton() {
    await this.checkOutButton.click();
  }

  async expectCheckOutButtonEnabled() {
    await expect(this.checkOutButton).toBeEnabled();
  }
}