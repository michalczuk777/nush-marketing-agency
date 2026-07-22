import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://nush.pl', { waitUntil: 'networkidle0' });
  const html = await page.evaluate(() => document.documentElement.outerHTML);
  console.log('HTML CONTENT:', html);
  
  await browser.close();
})();
