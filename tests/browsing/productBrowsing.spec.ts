import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';



test.describe('Product Browsing', () => {
    let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await page.waitForSelector('a.hrefch', { timeout: 10000 });
});

test('homepage loads with products', async ({ page }) => {
    await expect(page.locator('a.hrefch', { hasText: 'Nexus 6' })).toBeVisible();
});

test('should navigate to phone category and select a product', async ({ page }) => {
    await homePage.navigateToPhoneCategory();
    await expect(page.locator('a.hrefch', { hasText: 'Nexus 6' })).toBeVisible();
});

test('should navigate to laptop category and select a product', async ({ page }) => {
    await homePage.navigateToLaptopCategory();
    await expect(page.locator('a.hrefch', { hasText: 'MacBook air' })).toBeVisible(); 
});

test('should navigate to monitor category and select a product', async ({ page }) => {
    await homePage.navigateToMonitorCategory(); 
    await expect(page.locator('a.hrefch', { hasText: 'ASUS Full HD' })).toBeVisible();
});

test('should navigate to next and previous pages', async ({ page }) => {
    await homePage.navigateToNextPage();
    await page.waitForSelector('a.hrefch', { timeout: 10000 });
    await expect(page.locator('a.hrefch', { hasText: 'Nexus 6' })).not.toBeVisible();

    await homePage.navigateToPreviousPage();
    await page.waitForSelector('a.hrefch', { timeout: 10000 });
    await expect(page.locator('a.hrefch', { hasText: 'Nexus 6' })).toBeVisible();
});

});