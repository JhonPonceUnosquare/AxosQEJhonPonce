import { test } from '@playwright/test';

test('locates the username field and login button with different strategies', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const loginForm = page.getByRole('form', { name: 'Login' });

  const usernameLocators = {
    cssId: page.locator('#user-name'),
    cssAttributes: page.locator('input[data-test="username"][type="text"]'),
    cssRelational: page.locator(
      'form:has(input[data-test="username"]) input[data-test="username"]',
    ),
    xpathAttributes: page.locator('//input[@data-test="username" and @type="text"]'),
    placeholder: page.getByPlaceholder('Username', { exact: true }),
    chainedRole: loginForm.getByRole('textbox', { name: 'Username', exact: true }),
  };

  const loginButtonLocators = {
    cssId: page.locator('#login-button'),
    cssClasses: page.locator('input.submit-button.btn_action'),
    cssRelational: page.locator(
      'form:has(input[data-test="username"]) input[data-test="login-button"]',
    ),
    xpathRelative: page.locator(
      '//form[.//input[@data-test="username"]]//input[@data-test="login-button"]',
    ),
    accessibleRole: page.getByRole('button', { name: 'Login', exact: true }),
    chainedAttribute: loginForm.locator('[data-test="login-button"]'),
  };

  for (const locator of Object.values(usernameLocators)) {
    await locator.waitFor({ state: 'visible' });
  }

  for (const locator of Object.values(loginButtonLocators)) {
    await locator.waitFor({ state: 'visible' });
  }
});