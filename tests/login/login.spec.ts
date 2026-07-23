import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

const baseUrl = process.env.BASE_URL || 'https://www.demoblaze.com';
const username = process.env.USER_NAME ?? '';
const password = process.env.PASSWORD ?? '';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(username, password);

    await expect(page.locator('#nameofuser')).toContainText(username);
  });

  test('should show error for wrong username with correct password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    const dialogPromise = page.waitForEvent('dialog');
    await loginPage.login('wronguser', password);

    const dialog = await dialogPromise;
    expect(dialog.message()).toBe('User does not exist.');
    await dialog.accept();
  });

  test('should show error for correct username with wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    const dialogPromise = page.waitForEvent('dialog');
    await loginPage.login(username, 'WrongPass123');

    const dialog = await dialogPromise;
    expect(dialog.message()).toBe('Wrong password.');
    await dialog.accept();
  });

  test('should show validation when username and password are empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    const dialogPromise = page.waitForEvent('dialog');
    await loginPage.login('', '');

    const dialog = await dialogPromise;
    expect(dialog.message()).toBe('Please fill out Username and Password.');
    await dialog.accept();
  });
});