import { Page } from '@playwright/test';
import { Locator } from '@playwright/test'; 

export class CartPage {
    private readonly cartItems: Locator;
    private readonly priceLocator: Locator;
    private readonly deleteButton: Locator;
    private readonly placeOrderButton: Locator;

    constructor(private page: Page) {
        this.cartItems = page.locator('tr.success');
        this.priceLocator = page.locator('#totalp');
        this.deleteButton = page.locator('text=Delete');
        this.placeOrderButton = page.locator('button.btn-success[data-target="#orderModal"]');
    }

    async getCartItems() {
        return await this.cartItems.allTextContents();
    }

    async getTotal() {
    return await this.priceLocator.textContent();
}

    async deleteItem(itemName: string) {
        const itemLocator = this.cartItems.filter({ hasText: itemName }).first();
        await itemLocator.locator('text=Delete').click();
    }

    async checkout() {
        await this.placeOrderButton.click();
    }
}