#!/usr/bin/env python3
"""
Napoli Centrale - Full Menu API
Try to get complete menu using the AppID
"""

import asyncio
import json
import requests

async def get_full_menu():
    """Get full menu from appy.ro API"""
    
    app_id = "23891152"
    base_url = "https://apps.appy.ro"
    
    endpoints_to_try = [
        f"{base_url}/app/ActionAPP.svc/GetAppConfig?AppID={app_id}",
        f"{base_url}/app/ActionAPP.svc/GetProducts?AppID={app_id}",
        f"{base_url}/app/ActionAPP.svc/GetCategories?AppID={app_id}",
        f"{base_url}/app/ActionAPP.svc/GetFullConfig?AppID={app_id}",
        f"{base_url}/app/ActionAPP.svc/GetAppConfigXML?AppID={app_id}",
        f"{base_url}/api/shop/NapoliCentrale/config",
        f"{base_url}/webOrders/api/config?appId={app_id}",
        f"{base_url}/webOrders/api/products?appId={app_id}",
        f"{base_url}/webOrders/api/categories?appId={app_id}",
    ]
    
    results = []
    
    for endpoint in endpoints_to_try:
        try:
            print(f"Trying: {endpoint}")
            response = requests.get(endpoint, timeout=10, headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            })
            
            if response.status_code == 200:
                content_type = response.headers.get('content-type', '')
                
                if 'json' in content_type:
                    data = response.json()
                    results.append({
                        'url': endpoint,
                        'type': 'json',
                        'data': data
                    })
                    print(f"✅ JSON: {len(str(data))} chars")
                else:
                    text = response.text
                    results.append({
                        'url': endpoint,
                        'type': 'text',
                        'data': text[:5000]
                    })
                    print(f"✅ TEXT: {len(text)} chars")
            else:
                print(f"❌ Status: {response.status_code}")
                
        except Exception as e:
            print(f"❌ Error: {str(e)[:50]}")
    
    # Save results
    with open("/home/node/.openclaw/workspace/napoli-centrale/menu_api_results.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Saved {len(results)} API responses")
    
    # Look for products/categories in the data
    for result in results:
        data = result.get('data', {})
        if isinstance(data, dict):
            # Check for product/category keys
            for key in ['Products', 'products', 'Categories', 'categories', 'Menu', 'menu', 'Items', 'items']:
                if key in data:
                    items = data[key]
                    print(f"\n🎯 Found '{key}' in {result['url']}")
                    if isinstance(items, list):
                        print(f"   Count: {len(items)}")
                        if len(items) > 0:
                            print(f"   First item: {str(items[0])[:200]}")
                    elif isinstance(items, dict):
                        print(f"   Keys: {list(items.keys())[:10]}")

if __name__ == "__main__":
    asyncio.run(get_full_menu())
