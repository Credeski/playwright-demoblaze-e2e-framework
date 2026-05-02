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
        await page.goto(home);
        await page.click(`text=${productName}`); 
        await page.click('text=Add to cart');
        await use();
    }
});
