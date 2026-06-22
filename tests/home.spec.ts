import { expect } from '@playwright/test';
import { test } from "../utils/fixtures";

test.describe('Modivo UA — Головна сторінка', () => {
 
  test.beforeEach(async ({ page, homePage }) => {
    
    await homePage.open();
    await homePage.dismissCookieBanner();
    await page.setViewportSize({ width: 1400, height: 900 });
  });

  // ─────────────────────────────────────────────
  // 1. SEO / META
  // ─────────────────────────────────────────────
  test.describe('SEO та мета-теги', () => {
    test('має правильний title', async ({ page }) => {
      await expect(page).toHaveTitle(/MODIVO\.UA/i);
    });

    test('має непорожній meta description', async ( {homePage} ) => {
      const content = await homePage.getMetaDescriptionContent();
      expect(content).toBeTruthy();
      expect(content!.length).toBeGreaterThan(20);
    });

    test('має canonical URL що вказує на головну', async ( {homePage} ) => {
      const href = await homePage.getCanonicalHref();
      expect(href).toContain('modivo.ua');
    });

    test('має og:title та og:description', async ( {homePage} ) => {
      await expect(homePage.metaOgTitle).toHaveAttribute('content', /.+/);
      await expect(homePage.metaOgDescription).toHaveAttribute('content', /.+/);
    });
  });

  // ─────────────────────────────────────────────
  // 2. HEADER
  // ─────────────────────────────────────────────
  test.describe('Header',  () => {

    test('homepage has title', async ({ page }) => {
      await expect(page).toHaveTitle(/Жіноча, чоловіча і дитяча мода/);
    });

    test('логотип відображається', async ( {homePage} ) => {
      await expect(homePage.logo).toBeVisible();
    });

    test('клік на логотип залишає на домені modivo.ua', async ({ page, homePage }) => {
      await homePage.clickLogo();
      await expect(page).toHaveURL(/modivo\.ua/);
    });

    test('посилання "Ввійти" відображається та веде на /login', async ({ page, homePage }) => {
      await expect(homePage.loginLink).toBeVisible();
      await homePage.clickLogin();
      await expect(page).toHaveURL(/\/login/);
    });

    test('посилання "Улюблене" відображається та веде на /wishlist', async ({ page, homePage }) => {
      await expect(homePage.wishlistLink).toBeVisible();
      await homePage.clickWishlist();
      await expect(page).toHaveURL(/\/wishlist/);
    });

    test('посилання "Кошик" відображається та веде на /checkout/cart', async ({ page, homePage  }) => {
      await expect(homePage.cartLink).toBeVisible();
      await homePage.clickCart();
      await expect(page).toHaveURL(/\/checkout\/cart/);
    });

    test('посилання "Допомога" відображається', async ({ homePage } ) => {
      await expect(homePage.helpLink).toBeVisible();
    });
  });
});
