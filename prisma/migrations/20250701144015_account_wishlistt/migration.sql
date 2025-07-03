-- CreateTable
CREATE TABLE "CancelOrderType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "cancelOrderBehavior" TEXT NOT NULL DEFAULT 'direct',
    "script" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AccountTabSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "accountDetails" BOOLEAN NOT NULL DEFAULT true,
    "addresses" BOOLEAN NOT NULL DEFAULT true,
    "orders" BOOLEAN NOT NULL DEFAULT true,
    "wishlist" BOOLEAN NOT NULL DEFAULT false,
    "wishlistLink" TEXT,
    "credits" BOOLEAN NOT NULL DEFAULT false,
    "subscriptions" BOOLEAN NOT NULL DEFAULT false,
    "subscriptionsLink" TEXT,
    "cancelOrderBehavior" TEXT NOT NULL DEFAULT 'direct',
    "script" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MenuSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "shop" TEXT NOT NULL,
    "menuTabs" JSONB NOT NULL,
    "cancelOrderBehavior" TEXT NOT NULL,
    "script" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ApiCredentials" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "iconSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "iconColorBefore" TEXT NOT NULL,
    "iconColorAfter" TEXT NOT NULL,
    "customCSS" TEXT NOT NULL DEFAULT '',
    "classSelector" TEXT
);

-- CreateTable
CREATE TABLE "wishlistCustom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "css" TEXT NOT NULL,
    "showAddToCart" BOOLEAN NOT NULL DEFAULT true,
    "showBuyNow" BOOLEAN NOT NULL DEFAULT true,
    "displayMode" TEXT NOT NULL DEFAULT 'carousel',
    "productsPerRow" INTEGER NOT NULL DEFAULT 3,
    "initialProducts" INTEGER NOT NULL DEFAULT 6,
    "cardLayout" TEXT NOT NULL DEFAULT 'default',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "widgetSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "starsText" TEXT NOT NULL DEFAULT '{count} review/reviews',
    "starsColor" TEXT NOT NULL DEFAULT '#26d9b1',
    "showText" BOOLEAN NOT NULL DEFAULT true,
    "saveText" TEXT NOT NULL DEFAULT 'Save {percent}%',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "QuickViewCss" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "css" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "QuickViewCss_shop_key" ON "QuickViewCss"("shop");
