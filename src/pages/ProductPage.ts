import { Page } from '@playwright/test';
import { Locator } from '@playwright/test';


export class ProductPage {
    private readonly productName: Locator;
    private readonly productDescription: Locator;
    private readonly addToCartButton: Locator;


    constructor(private page: Page) {
    this.productName = page.locator('.name');
    this.productDescription = page.locator('#more-information .description');
    this.addToCartButton = page.locator('text=Add to cart');
    }

    async getProductName() {
        return await this.productName.textContent();
    }
    async getProductDescription() {
        return await this.productDescription.textContent();
    }
    async addProductToCart() {
        await this.addToCartButton.click();
    }
}