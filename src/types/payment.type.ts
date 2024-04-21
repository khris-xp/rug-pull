export type PaymentType = {
  paymentData: PaymentDataType;
  session: SessionType;
};

type PaymentDataType = {
  user: string;
  courses: string[];
  status: string;
  total: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type SessionType = {
  id: string;
  object: string;
  after_expiration: string;
  allow_promotion_codes: string;
  amount_subtotal: number;
  amount_total: number;
  automatic_tax: AutomaticTaxType;
  billing_address_collection: string;
  cancel_url: string;
  client_reference_id: string;
  client_secret: string;
  consent: string;
  consent_collection: string;
  created: number;
  currency: string;
  currency_conversion: string;
  custom_fields: string[];
  custom_text: CustomTextType;
  customer: string;
  customer_creation: string;
  customer_details: string;
  customer_email: string;
  expires_at: number;
  invoice: string;
  invoice_creation: InvoiceCreationType;
  livemode: boolean;
  locale: string;
  metadata: object;
  mode: string;
  payment_intent: string;
  payment_link: string;
  payment_method_collection: string;
  payment_method_configuration_details: string;
  payment_method_options: object;
  payment_method_types: string[];
  payment_status: string;
  phone_number_collection: PhoneNumberCollectionType;
  recovered_from: string;
  setup_intent: string;
  shipping_address_collection: string;
  shipping_cost: string;
  shipping_details: string;
  shipping_options: string[];
  status: string;
  submit_type: string;
  subscription: string;
  success_url: string;
  total_details: TotalDetailsType;
  ui_mode: string;
  url: string;
};

type AutomaticTaxType = {
  enabled: boolean;
  status: string;
};

type CustomTextType = {
  after_submit: string;
  shipping_address: string;
  submit: string;
  terms_of_service_acceptance: string;
};

type InvoiceCreationType = {
  enabled: boolean;
  invoice_data: InvoiceDataType;
};

type InvoiceDataType = {
  account_tax_ids: string;
  custom_fields: string;
  description: string;
  footer: string;
  metadata: object;
  rendering_options: string;
};

type PhoneNumberCollectionType = {
  enabled: boolean;
};

type TotalDetailsType = {
  amount_discount: number;
  amount_shipping: number;
  amount_tax: number;
};
