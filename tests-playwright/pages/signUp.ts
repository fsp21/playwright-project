import { expect, type Locator, type Page } from '@playwright/test';

export class SignUpPage {
  private readonly page: Page;
  private readonly firstNameField: Locator;
  private readonly lastNameField: Locator;
  private readonly emailAddressField: Locator;
  private readonly passwordField: Locator;
  private readonly createButton: Locator;
  private readonly emailAlreadyInUseMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // div and input have same "first name" name, can't use label 
    this.firstNameField = this.page.locator('input#first_name');
    this.lastNameField = this.page.locator('input#last_name');
    this.emailAddressField = this.page.locator('input#email');
    this.passwordField = this.page.locator('input#password');
    this.createButton = this.page.getByRole('button', {name: 'Create'})
    // is this localized? other languages etc
    this.emailAlreadyInUseMessage = this.page.getByText('This email address is already associated with an account. If this account is yours, you can reset your password')
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