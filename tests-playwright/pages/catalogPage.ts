import { expect, type Locator, type Page } from '@playwright/test';

export class CatalogPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickProduct(productName: string) {
    await this.page.getByRole('link', { name: productName }).click();
  }
}
