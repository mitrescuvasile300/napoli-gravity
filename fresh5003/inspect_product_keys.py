import asyncio, json
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(headless=True)
        page=await b.new_page()
        await page.goto('https://apps.appy.ro/webOrders/#shop/NapoliCentrale/ln/ro/l/23891750/g/0/pm/0?type=Delivery&t=rll&l=23891750', wait_until='networkidle')
        await page.wait_for_timeout(5000)
        data=await page.evaluate('''() => {
          const cfg=window.app?.ConfigXML; if(!cfg) return {ok:false};
          const prods=cfg.Products || {};
          const arr=Object.values(prods);
          const sample=arr.slice(0,30);
          const keys=Array.from(new Set(sample.flatMap(p=>Object.keys(p))));
          const imagey=keys.filter(k=>/img|image|photo|logo/i.test(k));
          // collect first product with any non-empty image-like value
          let found=null;
          for(const p of arr){
            for(const k of Object.keys(p)){
              if(/img|image|photo|logo/i.test(k)){
                const v=p[k];
                if(v && String(v).trim()!=='') { found={k,v,product:p.Name||p.ID,allKeys:Object.keys(p)}; break; }
              }
            }
            if(found) break;
          }
          return {ok:true, keys, imagey, found, first:arr[0]};
        }''')
        open('/home/node/.openclaw/workspace/napoli-centrale/fresh5003/product_keys.json','w',encoding='utf-8').write(json.dumps(data,ensure_ascii=False,indent=2))
        await b.close()
        print('saved')

asyncio.run(main())
