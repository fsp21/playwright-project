import { expect, type Locator, type Page } from '@playwright/test';

export class SideBar {
  readonly page: Page;
  readonly catalogButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.catalogButton = this.page.getByRole('link', {name: 'Catalog'});
  }

  async clickCatalogButton() {
    await this.catalogButton.click();
  }

  async expectCatalogPageTitle() {
    await expect(this.page).toHaveTitle(/Products/);
  }

}