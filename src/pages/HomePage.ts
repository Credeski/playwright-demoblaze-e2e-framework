import { Page } from '@playwright/test';
import { Locator } from '@playwright/test';
import { productName } from '../utils/testData';

const baseUrl = process.env.BASE_URL || 'https://www.demoblaze.com'; 
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
        this.phoneProduct = page.locator('a.hrefch', { hasText: 'Nexus 6' });
        this.laptopProduct = page.locator('a.hrefch', { hasText: 'MacBook air' });
        this.monitorProduct = page.locator('a.hrefch', { hasText: 'ASUS Full HD' });
    } 

    async navigateToHomePage() {
        await this.page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    }

    async navigateToPhoneCategory() {
        await this.phoneCategory.click();
        await this.page.waitForSelector('a.hrefch', { timeout: 10000 });
    }

    async navigateToPhoneProduct(){
        await this.page.waitForSelector('a.hrefch', { timeout: 10000 });
        await this.phoneProduct.click({ timeout: 30000 });
        await this.page.waitForLoadState('domcontentloaded');
    }

    async navigateToLaptopCategory() {
        await this.page.waitForSelector('a.hrefch', { timeout: 10000 });
        await this.laptopCategory.click();
    }   

    async navigateToLaptopProduct(){
        await this.page.waitForSelector('a.hrefch', { timeout: 10000 });
        await this.laptopProduct.click({ timeout: 30000 });
        await this.page.waitForLoadState('domcontentloaded');
    }
    
    async navigateToMonitorCategory() {
        await this.page.waitForSelector('a.hrefch', { timeout: 10000 });
        await this.monitorCategory.click();
    }
    
        async navigateToMonitorProduct(){
        await this.page.waitForSelector('a.hrefch', { timeout: 10000 });
        await this.monitorProduct.click({ timeout: 30000 });
        await this.page.waitForLoadState('domcontentloaded');
    }

    async navigateToNextPage() {
        await this.page.waitForSelector('a.hrefch', { timeout: 10000 });
        await this.nextButton.click();
    }   

    async navigateToPreviousPage() {
        await this.page.waitForSelector('a.hrefch', { timeout: 10000 });
        await this.previousButton.click();
    }

}

