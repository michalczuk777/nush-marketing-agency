import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('response', async response => {
    if (response.url().includes('/assets/index-C3_GwByA.js')) {
      console.log('JS RESPONSE TEXT:', await response.text());
    }
  });

  await page.goto('https://nush.pl', { waitUntil: 'networkidle0' });
  await browser.close();
})();
