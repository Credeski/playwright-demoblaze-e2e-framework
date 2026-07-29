import { expect } from 'playwright/test';
import { test } from '../../src/fixtures/base.fixture';
import { HomePage } from '../../src/pages/HomePage';
import { ProductPage } from '../../src/pages/ProductPage';
import { CartPage } from '../../src/pages/CartPage';


test.describe('Add to Cart Functionality', () => {
    let homePage: HomePage;
    let productPage: ProductPage;
    let cartPage: CartPage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await homePage.navigateToHomePage();
    await page.keyboard.press('Escape');
    await page.waitForSelector('a.hrefch', { timeout: 10000 })
});

test('should add a product to the cart and verify it is present', async ({ page }) => {
    await homePage.navigateToPhoneCategory();
    await homePage.navigateToPhoneProduct();

    page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Product added.');
    await dialog.accept();
});
    await productPage.addProductToCart();


    await page.goto(`${process.env.BASE_URL}/cart.html`);
    await page.waitForSelector('tr.success', { timeout: 10000 });
    //get the items in the cart and verify that the product is present
    const items = await cartPage.getCartItems();
    expect(items.some(item => item.includes('Nexus 6'))).toBe(true);

    //get the total price and verify that it is correct
    const total = await cartPage.getTotal();
    expect(total).toBe('650');
});

test('should delete a product from the cart', async ({ page, productInCart }) => {

    const cart = new CartPage(page);

    await page.goto(`${process.env.BASE_URL}/cart.html`);

    await page.waitForSelector('tr.success', { state: 'detached', timeout: 10000 });
    await cart.deleteItem('Samsung galaxy s6');

    const items = await cart.getCartItems();
    expect(items.some(item => item.includes('Samsung galaxy s6'))).toBe(false);
});

});