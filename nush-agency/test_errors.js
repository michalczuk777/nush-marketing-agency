import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));
  
  await page.evaluateOnNewDocument(() => {
    window.addEventListener('error', e => {
      console.log('WINDOW ERROR:', e.message);
    });
    window.addEventListener('unhandledrejection', e => {
      console.log('UNHANDLED REJECTION:', e.reason);
    });
  });

  await page.goto('http://127.0.0.1:3003', { waitUntil: 'networkidle0' });
  const html = await page.evaluate(() => document.body.innerHTML);
  console.log('HTML CONTENT:', html.substring(0, 500));
  
  await browser.close();
})();
