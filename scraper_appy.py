#!/usr/bin/env python3
"""
Napoli Centrale - Menu Scraper (Appy.ro)
The menu is loaded via iframe from appy.ro
"""

import asyncio
import json
import re
from playwright.async_api import async_playwright

async def scrape_appy_menu():
    """Scrape menu from appy.ro ordering system"""
    
    menu_data = {
        "restaurant": "Pizzeria Napoli Centrale",
        "source_url": "https://apps.appy.ro/webOrders/#shop/NapoliCentrale/ln/ro/pm/0/",
        "categories": {},
        "scraped_at": None
    }
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        try:
            print("🍕 Scraping Napoli Centrale menu from appy.ro...")
            
            # Navigate to the actual menu URL
            await page.goto("https://apps.appy.ro/webOrders/#shop/NapoliCentrale/ln/ro/pm/0/?type=Delivery", 
                          wait_until="networkidle")
            
            # Wait for menu to load
            print("⏳ Waiting for menu to load...")
            await page.wait_for_timeout(5000)
            
            # Take screenshot
            await page.screenshot(path="/home/node/.openclaw/workspace/napoli-centrale/appy_menu.png", full_page=True)
            print("📸 Screenshot saved")
            
            # Get page content
            content = await page.content()
            
            # Save raw content
            with open("/home/node/.openclaw/workspace/napoli-centrale/appy_content.html", "w", encoding="utf-8") as f:
                f.write(content)
            
            # Extract menu items using various selectors
            # Look for product names, prices, descriptions
            
            # Try to find all text that looks like menu items
            all_text = await page.evaluate('''() => {
                const texts = [];
                const elements = document.querySelectorAll('*');
                for (let el of elements) {
                    if (el.children.length === 0 && el.textContent.trim()) {
                        texts.push(el.textContent.trim());
                    }
                }
                return texts;
            }''')
            
            # Filter for likely menu items (contain prices or food keywords)
            food_keywords = ['pizza', 'paste', 'salata', 'desert', 'bautura', 'le', 'ron', 'lei']
            price_pattern = r'\d+[.,]?\d*\s*(lei|ron|\.?\d+)'
            
            menu_items = []
            for text in all_text:
                text_lower = text.lower()
                has_price = re.search(price_pattern, text_lower)
                has_food = any(kw in text_lower for kw in food_keywords)
                
                if (has_price or has_food) and len(text) < 200:
                    menu_items.append(text)
            
            # Also try to get structured data from network responses
            # Look for XHR requests that might contain menu data
            
            menu_data["raw_items"] = list(set(menu_items))  # Remove duplicates
            menu_data["scraped_at"] = "2026-02-20T13:55:00Z"
            
            # Save data
            with open("/home/node/.openclaw/workspace/napoli-centrale/appy_menu_data.json", "w", encoding="utf-8") as f:
                json.dump(menu_data, f, indent=2, ensure_ascii=False)
            
            print(f"✅ Found {len(menu_items)} potential menu items")
            print("📁 Data saved to appy_menu_data.json")
            
            # Print first 20 items for review
            print("\n📋 Sample items found:")
            for item in menu_items[:20]:
                print(f"  - {item}")
            
        except Exception as e:
            print(f"❌ Error: {e}")
            import traceback
            traceback.print_exc()
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(scrape_appy_menu())
