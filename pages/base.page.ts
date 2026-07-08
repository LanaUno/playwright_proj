import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
    protected page: Page;
    protected cookieAcceptButton: Locator;
    public endpoint = ''

    constructor(page: Page) {
        this.page = page;
        this.cookieAcceptButton = page.locator('button').filter({ hasText: /прийняти|згода|ok/i }).first();
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async isVisible(locator: Locator, options?: { timeout?: number }): Promise<boolean> {
        try {
            await expect(locator).toBeVisible({ timeout: options?.timeout || 3000 });
            return true;
        } catch (error) {
            return false;
        }
    }

    async click(locator: Locator, options?: { timeout?: number }) {
        await expect(locator).toBeVisible({ timeout: options?.timeout || 5000 });
        await locator.click();
    }

    async open(path = ''): Promise<void> {
        await this.page.goto(path)
    }

    async dismissCookieBanner() {
        try {
            await this.cookieAcceptButton.click({ timeout: 3000 });
        } catch {
        }
    }

}
