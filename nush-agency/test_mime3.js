import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('response', response => {
    if (response.url().includes('/assets/')) {
      console.log('ASSET URL:', response.url());
      console.log('CONTENT-TYPE:', response.headers()['content-type']);
    }
  });

  await page.goto('https://nush.pl', { waitUntil: 'networkidle0' });
  const html = await page.evaluate(() => document.documentElement.outerHTML);
  console.log('HTML CONTENT LENGTH:', html.length);
  if (html.length > 1000) {
     console.log('SUCCESS: DOM has content!');
  } else {
     console.log('FAIL: DOM is empty.');
  }
  await browser.close();
})();
