#!/usr/bin/env python3
"""
Napoli Centrale - Menu Scraper
Uses Playwright to scrape the original website
"""

import asyncio
import json
from playwright.async_api import async_playwright

async def scrape_napoli_menu():
    """Scrape menu from original website"""
    
    menu_data = {
        "restaurant": "Pizzeria Napoli Centrale",
        "url": "https://www.pizzerianapolicentrale.ro",
        "menu": {},
        "scraped_at": None
    }
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        try:
            print("🍕 Scraping Napoli Centrale menu...")
            
            # Navigate to menu page
            await page.goto("https://www.pizzerianapolicentrale.ro/meniu.html", wait_until="networkidle")
            await page.wait_for_timeout(3000)  # Wait for JS to load
            
            # Take screenshot for reference
            await page.screenshot(path="/home/node/.openclaw/workspace/napoli-centrale/original_site.png")
            print("📸 Screenshot saved")
            
            # Extract all text content
            content = await page.content()
            
            # Try to find menu items - common patterns
            # Look for product containers
            products = await page.query_selector_all(".product, .menu-item, .item, [class*='product'], [class*='menu']")
            
            print(f"Found {len(products)} potential product elements")
            
            # Extract product data
            menu_items = []
            for i, product in enumerate(products[:50]):  # Limit to first 50
                try:
                    # Try different selectors for name and price
                    name_elem = await product.query_selector("h3, h4, .name, .title, [class*='name'], [class*='title']")
                    price_elem = await product.query_selector(".price, [class*='price'], [class*='pret']")
                    desc_elem = await product.query_selector(".description, .desc, p")
                    
                    name = await name_elem.inner_text() if name_elem else None
                    price = await price_elem.inner_text() if price_elem else None
                    description = await desc_elem.inner_text() if desc_elem else None
                    
                    if name:
                        menu_items.append({
                            "name": name.strip(),
                            "price": price.strip() if price else None,
                            "description": description.strip() if description else None
                        })
                except:
                    continue
            
            menu_data["menu_items"] = menu_items
            menu_data["scraped_at"] = "2026-02-20T13:50:00Z"
            
            # Save raw content for analysis
            with open("/home/node/.openclaw/workspace/napoli-centrale/scraped_content.html", "w", encoding="utf-8") as f:
                f.write(content)
            
            # Save structured data
            with open("/home/node/.openclaw/workspace/napoli-centrale/menu_data.json", "w", encoding="utf-8") as f:
                json.dump(menu_data, f, indent=2, ensure_ascii=False)
            
            print(f"✅ Scraped {len(menu_items)} menu items")
            print("📁 Data saved to menu_data.json")
            
        except Exception as e:
            print(f"❌ Error: {e}")
            import traceback
            traceback.print_exc()
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(scrape_napoli_menu())
