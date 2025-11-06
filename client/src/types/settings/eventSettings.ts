import { EmailTemplate } from '../emails/emailTemplate';

export interface EventSettings {
  enabled_standard_fields: string[];
  email_template?: EmailTemplate;
}
