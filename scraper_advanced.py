#!/usr/bin/env python3
"""
Napoli Centrale - Advanced Menu Scraper
Intercept API calls to get structured menu data
"""

import asyncio
import json
from playwright.async_api import async_playwright

async def scrape_with_api_intercept():
    """Scrape by intercepting API calls"""
    
    api_responses = []
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        
        # Intercept all network requests
        async def handle_response(response):
            try:
                url = response.url
                if 'api' in url.lower() or 'menu' in url.lower() or 'product' in url.lower() or 'item' in url.lower():
                    body = await response.text()
                    if len(body) > 100:  # Only save substantial responses
                        api_responses.append({
                            'url': url,
                            'body': body[:5000]  # Limit size
                        })
                        print(f"🌐 API: {url[:80]}...")
            except:
                pass
        
        page.on("response", handle_response)
        
        try:
            print("🍕 Loading Napoli Centrale ordering system...")
            
            await page.goto("https://apps.appy.ro/webOrders/#shop/NapoliCentrale/ln/ro/pm/0/?type=Delivery", 
                          wait_until="networkidle")
            
            # Wait longer for API calls
            print("⏳ Waiting for API calls...")
            await page.wait_for_timeout(8000)
            
            # Try to click on categories to load more data
            print("🖱️ Exploring menu categories...")
            
            # Get all clickable elements
            elements = await page.query_selector_all('div, button, a, span')
            
            for i, el in enumerate(elements[:20]):
                try:
                    text = await el.inner_text()
                    if any(cat in text.lower() for cat in ['pizza', 'paste', 'salata', 'desert', 'bauturi']):
                        print(f"  Clicking: {text[:50]}")
                        await el.click()
                        await page.wait_for_timeout(1000)
                except:
                    continue
            
            # Wait more for API calls
            await page.wait_for_timeout(5000)
            
            # Try to extract data from page scripts
            scripts = await page.query_selector_all('script')
            script_data = []
            
            for script in scripts:
                try:
                    text = await script.inner_text()
                    if 'menu' in text.lower() or 'product' in text.lower() or 'item' in text.lower():
                        script_data.append(text[:2000])
                except:
                    continue
            
            # Take final screenshot
            await page.screenshot(path="/home/node/.openclaw/workspace/napoli-centrale/appy_detailed.png", full_page=True)
            
            # Save all collected data
            result = {
                "api_responses": api_responses,
                "script_snippets": script_data,
                "page_url": page.url
            }
            
            with open("/home/node/.openclaw/workspace/napoli-centrale/api_data.json", "w", encoding="utf-8") as f:
                json.dump(result, f, indent=2, ensure_ascii=False)
            
            print(f"\n✅ Captured {len(api_responses)} API responses")
            print(f"✅ Found {len(script_data)} relevant scripts")
            print("📁 Data saved to api_data.json")
            
            # Try to get window data
            window_data = await page.evaluate('''() => {
                const data = {};
                for (let key in window) {
                    if (key.toLowerCase().includes('menu') || 
                        key.toLowerCase().includes('product') ||
                        key.toLowerCase().includes('shop') ||
                        key.toLowerCase().includes('data')) {
                        try {
                            const value = window[key];
                            if (typeof value === 'object' && value !== null) {
                                data[key] = JSON.stringify(value).substring(0, 1000);
                            }
                        } catch(e) {}
                    }
                }
                return data;
            }''')
            
            with open("/home/node/.openclaw/workspace/napoli-centrale/window_data.json", "w", encoding="utf-8") as f:
                json.dump(window_data, f, indent=2, ensure_ascii=False)
            
            print(f"✅ Extracted {len(window_data)} window variables")
            
        except Exception as e:
            print(f"❌ Error: {e}")
            import traceback
            traceback.print_exc()
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(scrape_with_api_intercept())
