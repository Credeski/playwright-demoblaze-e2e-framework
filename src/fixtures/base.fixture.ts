import { test as base } from '@playwright/test';
import dotenv from 'dotenv';
import { productName } from '../utils/testData';


dotenv.config();
const home = process.env.BASE_URL || 'https://www.demoblaze.com';

type Fixtures = {
    productInCart: void
};

export const test = base.extend<Fixtures>({
    productInCart: async ({ page }, use) => {
    await page.goto(`${home}/prod.html?idp_=3`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('text=Add to cart', { timeout: 30000 });
    page.once('dialog', async dialog => await dialog.accept());
    await page.click('text=Add to cart');
    await use();
}
});
