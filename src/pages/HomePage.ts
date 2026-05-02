import { Page } from '@playwright/test';
import { Locator } from '@playwright/test';

export class HomePage {
    private readonly phoneCategory: Locator;
    private readonly laptopCategory: Locator;
    private readonly monitorCategory: Locator;
    private readonly previousButton: Locator;
    private readonly nextButton: Locator;
    private readonly phoneProduct: Locator;
    private readonly laptopProduct: Locator;
    private readonly monitorProduct: Locator;

    constructor(private page: Page) {
        this.phoneCategory = page.locator('a[onclick="byCat(\'phone\')"]');
        this.laptopCategory = page.locator('a[onclick="byCat(\'notebook\')"]');
        this.monitorCategory = page.locator('a[onclick="byCat(\'monitor\')"]');
        this.previousButton = page.locator('#prev2');
        this.nextButton = page.locator('#next2');
        this.phoneProduct = page.locator('text=Nexus 6');
        this.laptopProduct = page.locator('text=MacBook air');
        this.monitorProduct = page.locator('text=ASUS Full HD');
    } 

    async navigateToPhoneCategory() {
        await this.phoneCategory.click();
        await this.phoneProduct.click();
    }

    async navigateToLaptopCategory() {
        await this.laptopCategory.click();
        await this.laptopProduct.click();
    }   

    async navigateToMonitorCategory() {
        await this.monitorCategory.click();
        await this.monitorProduct.click();
    }
    
    async navigateToNextPage() {
        await this.nextButton.click();
    }   

    async navigateToPreviousPage() {
        await this.previousButton.click();
    }
}