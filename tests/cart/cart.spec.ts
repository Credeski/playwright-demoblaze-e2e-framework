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
});

test('should add a product to the cart and verify it is present', async ({ page }) => {
    await homePage.navigateToPhoneCategory();
    await homePage.navigateToPhoneProduct();

    const dialogPromise = page.waitForEvent('dialog');
    await productPage.addProductToCart();

    const dialog = await dialogPromise;
        expect(dialog.message()).toBe('Product added.');
        await dialog.accept();


    await page.goto(`${process.env.BASE_URL}/cart.html`);
    //get the items in the cart and verify that the product is present
    const items = await cartPage.getCartItems();
    expect(items).toContain('Nexus 6');

    //get the total price and verify that it is correct
    const total = await cartPage.getTotal();
    expect(total).toBe('650');
});

test('should delete a product from the cart', async ({ page, productInCart }) => {

    const cart = new CartPage(page);

    await page.goto(`${process.env.BASE_URL}/cart.html`);

    await cart.deleteItem('Nexus 6');

    const items = await cart.getCartItems();
    expect(items).not.toContain('Nexus 6');
});

});