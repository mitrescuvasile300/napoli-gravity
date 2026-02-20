#!/usr/bin/env python3
"""
Napoli Centrale - Direct API Scraper
Try to find the API endpoint that returns menu data
"""

import asyncio
import json
from playwright.async_api import async_playwright

async def find_menu_api():
    """Try to find API endpoint with menu data"""
    
    menu_data = None
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        
        # Store all JSON responses
        json_responses = []
        
        async def handle_response(response):
            try:
                url = response.url
                content_type = await response.header_value('content-type') or ''
                
                # Look for JSON responses
                if 'json' in content_type.lower() or url.endswith('.json'):
                    body = await response.text()
                    if len(body) > 500:  # Substantial data
                        json_responses.append({
                            'url': url,
                            'body': body[:10000]
                        })
                        print(f"🌐 JSON: {url[:100]}...")
                
                # Also check for specific API patterns
                if any(x in url.lower() for x in ['api', 'menu', 'product', 'shop', 'config']):
                    body = await response.text()
                    if len(body) > 1000 and len(body) < 50000:
                        try:
                            # Try to parse as JSON
                            data = json.loads(body)
                            json_responses.append({
                                'url': url,
                                'data': data
                            })
                            print(f"✅ API DATA: {url[:80]}...")
                        except:
                            pass
                            
            except:
                pass
        
        page.on("response", handle_response)
        
        try:
            print("🔍 Searching for menu API...")
            
            await page.goto("https://apps.appy.ro/webOrders/#shop/NapoliCentrale/ln/ro/pm/0/?type=Delivery", 
                          wait_until="networkidle")
            
            # Wait for all API calls
            await page.wait_for_timeout(10000)
            
            # Try common API endpoints
            api_endpoints = [
                "https://apps.appy.ro/api/shop/NapoliCentrale/config",
                "https://apps.appy.ro/api/shop/NapoliCentrale/menu",
                "https://apps.appy.ro/api/shop/NapoliCentrale/products",
                "https://apps.appy.ro/webOrders/api/config",
                "https://apps.appy.ro/webOrders/api/menu",
            ]
            
            for endpoint in api_endpoints:
                try:
                    print(f"Trying: {endpoint}")
                    response = await page.evaluate(f'''
                        async () => {{
                            try {{
                                const res = await fetch("{endpoint}");
                                return await res.text();
                            }} catch(e) {{
                                return "Error: " + e.message;
                            }}
                        }}
                    ''')
                    if response and len(response) > 500 and 'Error' not in response:
                        print(f"✅ FOUND DATA at {endpoint}")
                        json_responses.append({
                            'url': endpoint,
                            'body': response[:10000]
                        })
                except Exception as e:
                    print(f"❌ {endpoint}: {e}")
            
            # Save all collected data
            with open("/home/node/.openclaw/workspace/napoli-centrale/api_search_results.json", "w", encoding="utf-8") as f:
                json.dump(json_responses, f, indent=2, ensure_ascii=False)
            
            print(f"\n✅ Saved {len(json_responses)} API responses")
            
            # Print sample of any found data
            if json_responses:
                print("\n📋 Sample data found:")
                for i, resp in enumerate(json_responses[:3]):
                    print(f"\n--- Response {i+1} ---")
                    print(f"URL: {resp.get('url', 'N/A')}")
                    body = resp.get('body', '')[:500]
                    print(f"Body preview: {body}...")
            
        except Exception as e:
            print(f"❌ Error: {e}")
            import traceback
            traceback.print_exc()
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(find_menu_api())
