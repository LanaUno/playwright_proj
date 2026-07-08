import { test as base } from "@playwright/test";
import { BasePage } from "../pages/base.page";
import { HomePage } from "../pages/home.page";

type MyFixtures = {
    basePage: BasePage;
    homePage: HomePage;
};

export const test = base.extend<MyFixtures>({
    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);
        await use(basePage);
    },

    homePage: async ({ page }, use) => {
        const loginPage = new HomePage(page);
        await use(loginPage);
    },
});
