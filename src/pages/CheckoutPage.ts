import { Page } from '@playwright/test';
import { Locator } from '@playwright/test';
import { validCheckout } from '../utils/testData';

export class CheckoutPage {
    private readonly nameInput: Locator;
    private readonly countryInput: Locator;
    private readonly cityInput: Locator;
    private readonly creditCardInput: Locator;
    private readonly monthInput: Locator;
    private readonly yearInput: Locator;
    private readonly purchaseButton: Locator;
    private readonly confirmationModal: Locator;
    private readonly confirmationTitle: Locator;
    private readonly confirmationAmount: Locator;
    private readonly confirmationCard: Locator;
    private readonly confirmationName: Locator;

    constructor(private page: Page) {
        this.nameInput = page.locator('#name');
        this.countryInput = page.locator('#country');
        this.cityInput = page.locator('#city');
        this.creditCardInput = page.locator('#card');
        this.monthInput = page.locator('#month');
        this.yearInput = page.locator('#year');
        this.purchaseButton = page.locator('text=Purchase');

        this.confirmationModal = page.locator('.sweet-alert');
        this.confirmationTitle = this.confirmationModal.locator('h2');
        this.confirmationAmount = this.confirmationModal.locator('p').filter({ hasText: 'Amount' });
        this.confirmationCard = this.confirmationModal.locator('p').filter({ hasText: 'Card Number' });
        this.confirmationName = this.confirmationModal.locator('p').filter({ hasText: 'Name' });
    }

    async fillOrderForm(data: typeof validCheckout) {
        await this.nameInput.fill(data.name);
        await this.countryInput.fill(data.country);
        await this.cityInput.fill(data.city);
        await this.creditCardInput.fill(data.creditCard);
        await this.monthInput.fill(data.month);
        await this.yearInput.fill(data.year);
    }

    async purchase() {
        await this.purchaseButton.click();
    }

    async getConfirmationMessage() {
        return await this.confirmationTitle.textContent();
    }

    async getConfirmationAmount() {
        return await this.confirmationAmount.textContent();
    }

    async getConfirmationCardNumber() {
        return await this.confirmationCard.textContent();
    }

    async getConfirmationName() {
        return await this.confirmationName.textContent();
    }
}