import { Page } from '@playwright/test';
import { Locator } from '@playwright/test';


export class LoginPage {
    private readonly loginNav: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(private page: Page) {
        this.loginNav = page.locator('#login2');
        this.usernameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
        this.loginButton = page.locator('button[onclick="logIn()"]');
    }

    async login(username: string, password: string) {
        await this.loginNav.click();
        await this.page.waitForSelector('#loginusername', { state: 'visible' });
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(500);
        await this.loginButton.click();
    }
}
