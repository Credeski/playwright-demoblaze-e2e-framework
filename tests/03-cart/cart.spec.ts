import { expect } from 'playwright/test';
import { test } from '../../src/fixtures/base.fixture';
import { HomePage } from '../../src/pages/HomePage';
import { ProductPage } from '../../src/pages/ProductPage';
import { CartPage } from '../../src/pages/CartPage';


test.describe('Add to Cart Functionality', () => {

    test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/cart.html`);
    await page.waitForTimeout(3000);
    await page.evaluate(() => {
        const rows = document.querySelectorAll('tr.success');
        rows.forEach(row => {
            const deleteLink = row.querySelector('a[onclick^="deleteItem"]');
            if (deleteLink) (deleteLink as HTMLElement).click();
        });
    });
    await page.waitForTimeout(2000);
});

test('should add a product to the cart and verify it is present', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    await page.goto(`${process.env.BASE_URL}/prod.html?idp_=3`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('text=Add to cart', { timeout: 50000 });

    page.once('dialog', async dialog => {
    await dialog.accept();
});
    await productPage.addProductToCart();


    await page.goto(`${process.env.BASE_URL}/cart.html`);
    await page.waitForSelector('tr.success', { timeout: 10000 });
    //get the items in the cart and verify that the product is present
    const items = await cartPage.getCartItems();
    expect(items.some(item => item.includes('Nexus 6'))).toBe(true);

});

test('should delete a product from the cart', async ({ page, productInCart }) => {

    const cart = new CartPage(page);

    await page.goto(`${process.env.BASE_URL}/cart.html`);

    await page.waitForSelector('tr.success', { timeout: 30000 });
    await cart.deleteItem('Nexus 6');
    await page.waitForSelector('tr.success', { state: 'detached', timeout: 10000 });

    const items = await cart.getCartItems();
    expect(items.some(item => item.includes('Nexus 6'))).toBe(false);
});

});