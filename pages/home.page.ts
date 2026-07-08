import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import endpoints from '../constants/enpoints.constants.json'

export class HomePage extends BasePage {

  // ─── Meta / SEO ───────────────────────────────────────────────────────────
  readonly metaDescription: Locator;
  readonly metaCanonical: Locator;
  readonly metaOgTitle: Locator;
  readonly metaOgDescription: Locator;

  // ─── Cookie banner ────────────────────────────────────────────────────────
  //readonly cookieAcceptButton: Locator;

  // ─── Header ───────────────────────────────────────────────────────────────
  readonly logo: Locator;
  readonly logoLink: Locator;
  readonly loginLink: Locator;
  readonly wishlistLink: Locator;
  readonly cartLink: Locator;
  readonly helpLink: Locator;

  // ─── Promo banner (belka) ─────────────────────────────────────────────────
  readonly belkaBannerFirstLink: Locator;
  readonly belkaBannerAllLinks: Locator;

  // ─── Navigation menu ──────────────────────────────────────────────────────
  readonly navWomenLink: Locator;
  readonly navMenLink: Locator;
  readonly navKidsLink: Locator;
  readonly navSaleLink: Locator;
  readonly megaMenuWomenDropdownLink: Locator;

  // ─── Search ───────────────────────────────────────────────────────────────
  readonly searchInput: Locator;
  readonly searchSuggestions: Locator;

  // ─── Hero banner ──────────────────────────────────────────────────────────
  readonly heroBanner: Locator;
  readonly heroCtaLink: Locator;

  // ─── Product sections ─────────────────────────────────────────────────────
  readonly categoryLinks: Locator;
  readonly productCards: Locator;

  // ─── Brands section ───────────────────────────────────────────────────────
  readonly brandLinks: Locator;
  readonly reebokLink: Locator;

  // ─── Newsletter ───────────────────────────────────────────────────────────
  readonly newsletterBlock: Locator;

  // ─── Mobile app ───────────────────────────────────────────────────────────
  readonly mobileAppLink: Locator;

  // ─── Footer ───────────────────────────────────────────────────────────────
  readonly footer: Locator;
  readonly footerLinks: Locator;

  // ─── Accessibility ────────────────────────────────────────────────────────
  readonly imagesWithoutAlt: Locator;
  readonly mainLandmark: Locator;

  constructor(page: Page) {
    super(page);
    this.endpoint = endpoints.homepage;

    // Meta / SEO
    this.metaDescription    = page.locator('meta[name="description"]');
    this.metaCanonical      = page.locator('link[rel="canonical"]');
    this.metaOgTitle        = page.locator('meta[property="og:title"]');
    this.metaOgDescription  = page.locator('meta[property="og:description"]');

    // Cookie banner
    //this.cookieAcceptButton = page.locator('button').filter({ hasText: /прийняти|згода|ok/i }).first();

    // Header
    this.logo       = page.locator('[data-test-id="header-logo-button"]');
    this.logoLink   = page.locator('a[href="/m/zhinky.html"], a[href="/"]').first();
    this.loginLink  = page.locator('[class="header-tooltip account-tooltip"]:nth-child(1)');
    this.wishlistLink = page.locator('a[href="/wishlist"]').first();
    this.cartLink   = page.locator('a[href="/checkout/cart"]').first();
    this.helpLink   = page.locator('a[href*="tsentr-dopomohy"]').first();

    // Promo banner
    this.belkaBannerFirstLink = page.locator('a[href*="itm_medium=belka"]').first();
    this.belkaBannerAllLinks  = page.locator('a[href*="itm_medium=belka"]');

    // Navigation menu
    this.navWomenLink   = page.locator('a[href="/m/zhinky.html"]').first();
    this.navMenLink     = page.locator('a[href="/m/choloviky.html"]').first();
    this.navKidsLink    = page.locator('a[href="/m/dity.html"]').first();
    this.navSaleLink    = page.locator('a').filter({ hasText: /РОЗПРОДАЖ/i }).first();
    this.megaMenuWomenDropdownLink = page.locator('a[href*="itm_medium=menu_navbar_women"]').first();

    // Search
    this.searchInput      = page.locator('input[type="search"], input[placeholder*="Пошук"], input[placeholder*="пошук"]').first();
    this.searchSuggestions = page.locator('[class*="suggest"], [class*="autocomplete"], [class*="dropdown"]').first();

    // Hero banner
    this.heroBanner  = page.locator('[class*="hero"], [class*="banner"], [class*="slider"], [class*="carousel"]').first();
    this.heroCtaLink = page.locator('a[href*="itm_source=home"]').first();

    // Product sections
    this.categoryLinks = page.locator('a[href*="/c/"]');
    this.productCards  = page.locator('[class*="product"], [class*="card"], [class*="tile"]');

    // Brands
    this.brandLinks = page.locator('a[href*="virobnik_1"]');
    this.reebokLink = page.locator('a[href*="reebok"]').first();

    // Newsletter
    this.newsletterBlock = page.locator('text=/розсилк|підпишися|новини/i').first();

    // Mobile app
    this.mobileAppLink = page.locator('a[href*="modivoapp"], a[href*="onelink"]').first();

    // Footer
    this.footer      = page.locator('footer');
    this.footerLinks = page.locator('footer a');

    // Accessibility
    this.imagesWithoutAlt = page.locator('img:not([alt])');
    this.mainLandmark     = page.locator('#main-content, main, [role="main"]').first();
  }

//   // ─── Actions ──────────────────────────────────────────────────────────────

  async open() {
    await super.open(this.endpoint);
  }

  async clickLogo() {
    await this.logo.click();
  }

  async clickLogin() {
    await this.loginLink.waitFor({ state: 'visible', timeout: 6000 });
    await this.loginLink.click();
  }

  async clickWishlist()  {
    await this.wishlistLink.click();
  }

  async clickCart() {
    await this.cartLink.click();
  }

  async clickNavWomen(){
    await this.navWomenLink.click();
  }

  async clickNavMen() {
    await this.navMenLink.click();
  }

  async clickNavKids() {
    await this.navKidsLink.click();
  }

  async hoverNavWomen() {
    await this.navWomenLink.hover();
  }

  async searchFor(query: string)  {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }

  async typeInSearch(query: string) {
    await this.searchInput.fill(query);
  }

  // ─── Getters ──────────────────────────────────────────────────────────────

  async getMetaDescriptionContent(): Promise<string | null> {
    return this.metaDescription.getAttribute('content');
  }

  async getCanonicalHref(): Promise<string | null> {
    return this.metaCanonical.getAttribute('href');
  }

  async getBelkaBannerCount(): Promise<number> {
    return this.belkaBannerAllLinks.count();
  }

  async getBelkaBannerFirstHref(): Promise<string | null> {
    return this.belkaBannerFirstLink.getAttribute('href');
  }

  async getCategoryLinksCount(): Promise<number> {
    return this.categoryLinks.count();
  }

  async getProductCardsCount(): Promise<number> {
    return this.productCards.count();
  }

  async getBrandLinksCount(): Promise<number> {
    return this.brandLinks.count();
  }

  async getReebokLinkHref(): Promise<string | null> {
    return this.reebokLink.getAttribute('href');
  }

  async getFooterLinksCount(): Promise<number> {
    return this.footerLinks.count();
  }

  async getImagesWithoutAltCount(): Promise<number> {
    return this.imagesWithoutAlt.count();
  }

  async getBodyScrollWidth(): Promise<number> {
    return this.page.evaluate(() => document.body.scrollWidth);
  }

  async getBodyClientWidth(): Promise<number> {
    return this.page.evaluate(() => document.body.clientWidth);
  }
}

