const pupperteer = require('puppeteer');

async function sendUnsecureComment(comment) {
  const browser = await pupperteer.launch({
    headless: false,
    //slowMo: 40,
    args: ['--window-size=1920,1080'],
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/comments');
  await page.click('.security__container > button');
  await page.click('.comments-form > input');
  await page.type('.comments-form > input', 'Haker');
  await page.click('.comments-form > textarea');
  await page.type('.comments-form > textarea', comment);
  await page.click('.comments-form > button');

  return page;
}

test('Comment with <img> should not inject script', async () => {
  const testCookie = Math.random().toString(36).substring(7);
  const unsecureComment = ` <img 
                              src="https://placeimgxxx.com/320/320/any" 
                              onerror="document.cookie=\'${testCookie}=0\'"
                            >`;

  const page = await sendUnsecureComment(unsecureComment);
  await page.reload({
    timeout: 1000,
    waitUntil: ['networkidle0', 'domcontentloaded'],
  });
  await page.click('.security__container > button');
  const cookies = await page.cookies();
  debugger;

  expect(cookies.find(c => c.name === testCookie)).toBeFalsy();
}, 1000000);

test('Comment with <script> should not inject script', async () => {
  const testCookie = Math.random().toString(36).substring(7);
  const unsecureComment = ` <script>
                              document.cookie="${testCookie}=0"
                            </script>`;

  const page = await sendUnsecureComment(unsecureComment);
  await page.reload({
    timeout: 1000,
    waitUntil: ['networkidle0', 'domcontentloaded'],
  });
  await page.click('.security__container > button');
  const cookies = await page.cookies();

  expect(cookies.find(c => c.name === testCookie)).toBeFalsy();
}, 1000000);

test('Comment with <button> should not inject clickable button with script', async () => {
  const testCookie = Math.random().toString(36).substring(7);
  const unsecureComment = ` <button 
                              class="test-button-${testCookie}"
                              onclick="document.cookie=\'${testCookie}=0\'"
                            >`;

  const page = await sendUnsecureComment(unsecureComment);
  await expect(page.click(`.test-button-${testCookie}`)).rejects.toThrow();
  await page.reload({
    timeout: 1000,
    waitUntil: ['networkidle0', 'domcontentloaded'],
  });
  await page.click('.security__container > button');
  const cookies = await page.cookies();

  expect(cookies.find(c => c.name === testCookie)).toBeFalsy();
}, 1000000);
