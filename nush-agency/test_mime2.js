import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('response', response => {
    if (response.url().includes('/assets/')) {
      console.log('ASSET URL:', response.url());
      console.log('STATUS:', response.status());
      console.log('HEADERS:', response.headers());
    }
  });

  await page.goto('https://nush.pl', { waitUntil: 'networkidle0' });
  await browser.close();
})();
