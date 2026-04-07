import { test } from '@playwright/test';
import { SideBar } from '../components/sideBar.component';
import { Header } from '../components/header.component';
import { CatalogPage } from '../pages/catalogPage';
import { ProductDetailsPage } from '../pages/productDetailsPage';

test('Add one product to cart', async ({ page }) => {
  const sideBar = new SideBar(page);
  const catalogPage = new CatalogPage(page);
  const header = new Header(page);
  const productDetailsPage = new ProductDetailsPage(page);

  await page.goto('/');
  await sideBar.clickCatalogButton();
  await sideBar.expectCatalogPageTitle();

  await catalogPage.clickProduct('Noir jacket');

  await productDetailsPage.addProductFlow({
    productSize: 'L',
    colorName: 'Red',
  });
  await header.expectProductAddedToCart(1);
});
