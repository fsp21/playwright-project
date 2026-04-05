import { expect, type Locator, type Page } from '@playwright/test';

export class SignUpPage {
  readonly page: Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly emailAddressField: Locator;
  readonly passwordField: Locator;
  readonly createButton: Locator;
  readonly emailAlreadyInUseMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // div and input have same "first name" name, can't use label 
    this.firstNameField = page.locator('input#first_name');
    this.lastNameField = page.locator('input#last_name');
    this.emailAddressField = page.locator('input#email');
    this.passwordField = page.locator('input#password');
    this.createButton = page.getByRole('button', {name: 'Create'})
    // is this localized? other languages etc
    this.emailAlreadyInUseMessage = page.getByText('This email address is already associated with an account. If this account is yours, you can reset your password')
  }

  async signUp(userEmail: string, userPassword: string) {
    await this.firstNameField.fill('First name test')
    await this.lastNameField.fill('Last name test')
    await this.emailAddressField.fill(userEmail);
    await this.passwordField.fill(userPassword);
    await this.createButton.click();
  }

  async expectEmailAlreadyInUseMessage() {
    await expect(this.emailAlreadyInUseMessage).toBeVisible();
  }

}