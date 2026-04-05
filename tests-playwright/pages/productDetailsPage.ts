import { expect, type Locator, type Page } from '@playwright/test';

export class ProductDetailsPage {
  private readonly page: Page;
  private readonly productSizeDropdown: Locator;
  private readonly productColorDropdown: Locator;
  private readonly addToCartButton: Locator;
  private readonly soldOutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productSizeDropdown = page.getByLabel('Size');
    this.productColorDropdown = page.getByLabel('Color');
    this.addToCartButton = page.getByRole('button', {name: 'Add to cart'});
    this.soldOutButton = page.getByRole('button', {name: 'Sold Out'});
  };

  async selectSize(productSize: string) {
    await this.productSizeDropdown.selectOption(productSize)
  };

  async selectColor(colorName: string) {
    await this.productColorDropdown.selectOption(colorName)
  };

  async clickAddToCart() {
    await this.addToCartButton.click();
  };

  async addProductFlow(details: {
    productSize: string,
    colorName:string
  }) {
    await this.selectSize(details.productSize);
    await this.selectColor(details.colorName);
    await this.clickAddToCart();
  };

  async expectSoldOutButtonToBeVisible() {
    await expect(this.soldOutButton).toBeDisabled();
  };

  async expectAddToCartButtonToBeHidden(){
    await expect(this.addToCartButton).toBeHidden();
  }
}