import { expect, type Locator, type Page } from '@playwright/test';

export class CatalogPage {
  readonly page: Page;
  readonly emailAddressField: Locator;
  readonly productSizeDropdown: Locator;
  readonly productColorDropdown: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailAddressField = page.getByLabel('Email Address');
    this.productSizeDropdown = page.getByLabel('Size');
    this.productColorDropdown = page.getByLabel('Color');
    this.addToCartButton = page.getByRole('button', {name: 'Add to cart'});
  }

  async clickProduct(productName: string) {
    await this.page.getByRole('link', {name: productName}).click();
  }

  async selectSize(productSize: string) {
    await this.productSizeDropdown.selectOption(productSize)
  }

  async selectColor(colorName: string) {
    await this.productColorDropdown.selectOption(colorName)
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  async addProductFlow({ productName, productSize, colorName }: { productName: string, productSize: string, colorName: string }) {
    await this.clickProduct(productName);
    await this.selectSize(productSize);
    await this.selectColor(colorName);
    await this.clickAddToCart();
  }
}