import { test, expect } from '@playwright/test';

test('Forgot Password Flow', async ({ page }) => {
  // 1. Navigate to the site
  await page.goto('https://the-internet.herokuapp.coms/');

  // 2. Click on Forgot Password
  await page.getByText('Forgot Password').click();

  // 3. Wait for 2 seconds
  // Note: 2000ms = 2 seconds
  await page.waitForTimeout(2000);

  // 4. Enter email: abc@gmail.com
  // The input field has an ID of 'email'
  await page.locator('#email').fill('abc@gmail.com');

  // 5. Click on Retrieve password
  // The button has an ID of 'form_submit'
  await page.locator('#form_submit').click();

  // 6. Wait for 2 seconds
  await page.waitForTimeout(2000);

  // Note: Playwright automatically closes the browser/context 
  // after the test function finishes, so a manual close isn't required here.
});