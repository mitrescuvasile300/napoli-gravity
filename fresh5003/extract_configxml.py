import asyncio, json
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto('https://apps.appy.ro/webOrders/#shop/NapoliCentrale/ln/ro/l/23891750/g/0/pm/0?type=Delivery&t=rll&l=23891750', wait_until='networkidle')
        await page.wait_for_timeout(6000)

        data = await page.evaluate('''() => {
          if (!window.app || !app.ConfigXML) return {ok:false};
          const cfg = app.ConfigXML;
          const menuList = cfg.MenuList || [];
          const mods = cfg.ProductsModules || {};
          const prods = cfg.Products || {};

          const categories = [];
          for (const m of menuList) {
            const module = mods[m.ID];
            if (!module) continue;
            const cat = {
              id: module.ID || m.ID,
              name: module.Title || m.Name || 'Categorie',
              image150: module.ImgLogoURL150 || module.ImgLogoURL || '',
              image600: module.ImgLogoURL600 || '',
              img: module.Img || '',
              imgVersions: module.ImgVersions || '',
              products: []
            };
            const ids = module.Products || [];
            for (const pid of ids) {
              const pr = prods[pid];
              if (!pr) continue;
              const price = (pr.PriceObj && (pr.PriceObj.npInt + (pr.PriceObj.npFloat?'.'+pr.PriceObj.npFloat:''))) || pr.Price || pr.PriceText || '';
              cat.products.push({
                id: pr.ID,
                name: pr.Name,
                desc: pr.InfoText || '',
                grams: pr.GramsPerUnitType || 0,
                priceText: pr.PriceText || '',
                price,
                img: pr.Img || '',
                imgVersions: pr.ImgVersions || '',
                img150: pr.ImgLogoURL150 || pr.ImgLogoURL || '',
                img600: pr.ImgLogoURL600 || '',
                available: pr.AvailableInWEB !== false
              });
            }
            categories.push(cat);
          }

          return {
            ok:true,
            app:{
              name: app.AppInfo?.AppName || 'Napoli Centrale',
              description: app.AppInfo?.AppDescription || '',
              phone: app.AppInfo?.AppPhone || '',
              currency: app.AppInfo?.Currency || 'RON'
            },
            categories
          };
        }''')

        with open('/home/node/.openclaw/workspace/napoli-centrale/fresh5003/original_config_data.json','w',encoding='utf-8') as f:
            json.dump(data,f,ensure_ascii=False,indent=2)

        await browser.close()
        print('saved', data.get('ok'), 'cats', len(data.get('categories',[])))

asyncio.run(main())
