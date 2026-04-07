import { expect, type Locator, type Page } from '@playwright/test';

export class CheckOutPage {
  private readonly page: Page;
  private readonly firstNameField: Locator;
  private readonly lastNameField: Locator;
  private readonly emailAddressField: Locator;
  private readonly deliveryCountryDropDown: Locator;
  private readonly companyField: Locator;
  private readonly addressField: Locator;
  private readonly postalCodeField: Locator;
  private readonly cityField: Locator;
  private readonly phoneField: Locator;
  private readonly saveInfoCheckbox: Locator;
  private readonly creditCardNumberField: Locator;
  private readonly creditCardExpirationDateField: Locator;
  private readonly creditCardSecurityCodeField: Locator;
  private readonly useShippingAddressCheckbox: Locator;
  private readonly payNowButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailAddressField = this.page.getByLabel('Email', { exact: true });
    this.firstNameField = this.page.getByLabel('First name (optional)');
    // There's other 'last name' fields hidden in the DOM, need to be very specific
    this.lastNameField = this.page.locator('input[name="lastName"][required]');
    this.companyField = this.page.getByLabel('Company (Optional)');
    this.deliveryCountryDropDown = this.page.locator('[name="countryCode"]');
    this.addressField = this.page.getByPlaceholder('Address');
    this.postalCodeField = this.page.getByRole('textbox', {
      name: 'Postal code',
    });
    this.cityField = this.page.getByPlaceholder('City');
    this.phoneField = this.page.getByPlaceholder('Phone');
    this.saveInfoCheckbox = this.page.getByLabel(
      'Save this information for next time',
    );

    // Payment info sits inside iframes
    this.creditCardNumberField = page
      .frameLocator('[id^="card-fields-number"]')
      .getByPlaceholder('Card number');

    this.creditCardExpirationDateField = page
      .frameLocator('[id^="card-fields-expiry"]')
      .getByPlaceholder('Expiration date (MM / YY)');

    this.creditCardSecurityCodeField = page
      .frameLocator('[id^="card-fields-verification_value"]')
      .getByPlaceholder('Security code');

    this.useShippingAddressCheckbox = page.getByLabel(
      'Use shipping address as billing address',
    );
    this.payNowButton = page.getByRole('button', { name: 'Pay now' });
  }

  async fillContactEmail(email: string) {
    await this.emailAddressField.fill(email);
  }

  async fillFirstName(firstName: string) {
    await this.firstNameField.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameField.fill(lastName);
  }

  async fillCompany(company: string) {
    await this.companyField.fill(company);
  }

  async selectDeliveryCountry(country: string) {
    await this.deliveryCountryDropDown.selectOption(country);
  }

  async fillAddress(address: string) {
    await this.addressField.fill(address);
  }

  async fillPostalCode(postalCode: string) {
    await this.postalCodeField.fill(postalCode);
  }

  async fillCity(city: string) {
    await this.cityField.fill(city);
  }

  async fillPhone(phone: string) {
    await this.phoneField.fill(phone);
  }

  async fillCardNumber(cardNumber: string) {
    await this.creditCardNumberField.fill(cardNumber);
  }

  async fillExpirationDate(expirationDate: string) {
    await this.creditCardExpirationDateField.fill(expirationDate);
  }

  async fillSecurityCode(securityCode: string) {
    await this.creditCardSecurityCodeField.fill(securityCode);
  }

  async clickPayNow() {
    await this.payNowButton.click();
  }

  async checkSaveInfoCheckbox() {
    await this.saveInfoCheckbox.check();
  }

  async expectPaymentSuccessful() {
    await expect(this.page.getByText('Your order is confirmed')).toBeVisible();
  }

  async expectPaymentUnsuccessful() {
    await expect(
      this.page.getByText('There was an issue processing your payment'),
    ).toBeVisible();
  }

  async fillDeliveryAddressInfo(details: {
    email: string;
    firstName: string;
    lastName: string;
    company?: string;
    country: string;
    address: string;
    postalCode: string;
    city: string;
    phone?: string;
  }) {
    await this.fillContactEmail(details.email);
    await this.selectDeliveryCountry(details.country);
    await this.fillFirstName(details.firstName);
    await this.fillLastName(details.lastName);
    if (details.company) await this.fillCompany(details.company);
    await this.fillAddress(details.address);
    await this.fillPostalCode(details.postalCode);
    await this.fillCity(details.city);
    if (details.phone) await this.fillPhone(details.phone);
    await this.checkSaveInfoCheckbox();
  }

  async fillPaymentInfo(details: {
    cardNumber: string;
    expirationDate: string;
    securityCode: string;
  }) {
    await this.fillCardNumber(details.cardNumber);
    await this.fillExpirationDate(details.expirationDate);
    await this.fillSecurityCode(details.securityCode);
    if (!this.saveInfoCheckbox.isChecked) await this.saveInfoCheckbox.check();
  }
}
