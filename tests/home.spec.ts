import { expect } from '@playwright/test';
import { test } from "../utils/fixtures";
import homePageTextConstants from '../constants/homePageText.constants.json'
import endpoints from '../constants/enpoints.constants.json'

test.describe('Home page functionality', () => {
  test.beforeEach(async ({ page, homePage }) => {
    
    await homePage.open();
    await homePage.dismissCookieBanner();
    await page.setViewportSize({ width: 1400, height: 900 });
  });
  // ─────────────────────────────────────────────
  // 1. SEO / META
  // ─────────────────────────────────────────────
    test('homepage has title', async ({ page }) => {
      await expect(page).toHaveTitle(homePageTextConstants.homePageTitle);
    });
    
    test('has a non-empty meta description', async ( {homePage} ) => {
      const content = await homePage.getMetaDescriptionContent();
      expect(content).toBeTruthy();
      expect(content!.length).toBeGreaterThan(20);
    });

    test('has a canonical URL that points to the main', async ( {homePage} ) => {
      const href = await homePage.getCanonicalHref();
      expect(href).toContain('modivo.ua');
    });

    test('has og:title and og:description', async ( {homePage} ) => {
      await expect(homePage.metaOgTitle).toHaveAttribute('content', /.+/);
      await expect(homePage.metaOgDescription).toHaveAttribute('content', /.+/);
    });
  // ─────────────────────────────────────────────
  // 2. HEADER
  // ─────────────────────────────────────────────
    test('Header logo is displayed', async ( {homePage} ) => {
      await expect(homePage.logo).toBeVisible();
    });

    test('Clicking the Header logo keeps the user on the modivo.ua domain.', async ({ page, homePage }) => {
      await homePage.clickLogo();
      await expect(page).toHaveURL(process.env.BASE_URL + endpoints.women);
    });

    test('The "Ввійти" Header link is displayed and leads to /login.', async ({ page, homePage }) => {
      await expect(homePage.loginLink).toBeVisible();
      await homePage.clickLogin();
      await expect(page).toHaveURL(process.env.BASE_URL + endpoints.login);
    });

    test('The "Улюблене" Header link is displayed and leads to /wishlist', async ({ page, homePage }) => {
      await expect(homePage.wishlistLink).toBeVisible();
      await homePage.clickWishlist();
      await expect(page).toHaveURL(process.env.BASE_URL + endpoints.wishlist);
    });

    test('The "Кошик" Header link is displayed and leads to /checkout/cart.', async ({ page, homePage  }) => {
      await expect(homePage.cartLink).toBeVisible();
      await homePage.clickCart();
      await expect(page).toHaveURL(process.env.BASE_URL + endpoints.checkout + endpoints.cart);
    });

    test('The "Допомога" Header link is displayed', async ({ homePage } ) => {
      await expect(homePage.helpLink).toBeVisible();
    });
});
