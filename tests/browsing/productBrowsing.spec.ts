import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';



test.describe('Product Browsing', () => {
    let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
});

test('homepage loads with products', async ({ page }) => {
    await expect(page.locator('text=Nexus 6')).toBeVisible();
});

test('should navigate to phone category and select a product', async ({ page }) => {
    await homePage.navigateToPhoneCategory();
    await expect(page.locator('text=Nexus 6')).toBeVisible();
});

test('should navigate to laptop category and select a product', async ({ page }) => {
    await homePage.navigateToLaptopCategory();
    await expect(page.locator('text=MacBook air')).toBeVisible(); 
});

test('should navigate to monitor category and select a product', async ({ page }) => {
    await homePage.navigateToMonitorCategory(); 
    await expect(page.locator('text=ASUS Full HD')).toBeVisible();
});

test('should navigate to next and previous pages', async ({ page }) => {
    await homePage.navigateToNextPage();
    await expect(page.locator('text=Nexus 6')).not.toBeVisible();
    await homePage.navigateToPreviousPage();
    await expect(page.locator('text=Nexus 6')).toBeVisible();
});

});