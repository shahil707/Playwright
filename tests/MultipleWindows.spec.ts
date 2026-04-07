import { test, expect } from '@playwright/test';

test('Multiple Windows Automation', async ({ page, context }) => {
  // 1. Navigate to the site
  await page.goto('https://the-internet.herokuapp.com/');

  // 2. Click on Multiple Windows
  await page.getByText('Multiple Windows').click();

  // 3. Wait for 2 seconds
  await page.waitForTimeout(2000);

  // 4. Click on "Click Here" and capture the new window
  // We use Promise.all to wait for both the click and the new page to load
  const [newPage] = await Promise.all([
    context.waitForEvent('page'), // Listen for a new tab/window opening
    page.getByText('Click Here').click(), // Trigger the action
  ]);

  // 5. Wait for 2 seconds (on the original page or new page)
  await newPage.waitForTimeout(2000);

  // 6. Verify "New Window" text in the newly opened window
  const newWindowTitle = await newPage.locator('h3').textContent();
  console.log('Text found in new window:', newWindowTitle);
  
  // Assertion to ensure the text matches
  await expect(newPage.locator('h3')).toHaveText('New Window');

  // 7. Wait for 2 seconds
  await newPage.waitForTimeout(2000);

  // 8. Close the browser 
  // (In Playwright Test, the browser closes automatically at the end of the test)
});