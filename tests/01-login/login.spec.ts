import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

const baseUrl = process.env.BASE_URL || 'https://www.demoblaze.com';
const username = process.env.USER_NAME ?? '';
const password = process.env.PASSWORD ?? '';

test.describe('Login', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());
    await page.evaluate(() => {
        const modal = document.getElementById('logInModal');
        if (modal) modal.classList.remove('show');
        document.body.classList.remove('modal-open');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
    });
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);


await loginPage.login(username, password);

  await loginPage.login(username, password);
  await expect(page.locator('#nameofuser')).toContainText(username, { timeout: 20000 });
  });

  test('should show error for wrong username with correct password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    const dialogPromise = page.waitForEvent('dialog');
    await loginPage.login('wronguser', password);

    const dialog = await dialogPromise;
    expect(dialog.message()).toBe('Wrong password.');
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

  page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Please fill out Username and Password.');
        await dialog.accept();
    });

    await loginPage.login('', '');
  });
});