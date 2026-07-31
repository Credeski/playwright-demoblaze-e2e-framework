import { expect } from '@playwright/test';
import { validCheckout } from '../../src/utils/testData';
import { CheckoutPage } from '../../src/pages/CheckoutPage';
import { CartPage } from '../../src/pages/CartPage';
import { test } from '../../src/fixtures/base.fixture';



test.describe('Checkout', () => {
    test('should complete checkout successfully', async ({ page, productInCart }) => {
        const cartPage = new CartPage(page);

        await page.goto(`${process.env.BASE_URL}/cart.html` , { waitUntil: 'domcontentloaded' });
        await cartPage.checkout();

        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillOrderForm(validCheckout);
        await checkoutPage.purchase();

        const confirmationMessage = await checkoutPage.getConfirmationMessage();
        expect(confirmationMessage).toContain('Thank you for your purchase!');

        const confirmationCardNumber = await checkoutPage.getConfirmationCardNumber();
        expect(confirmationCardNumber).toContain(validCheckout.creditCard);

        const confirmationName = await checkoutPage.getConfirmationName();
        expect(confirmationName).toContain(validCheckout.name);
    });
});


