import { EmailTemplate } from '../emails'

export interface EventSettings {
  enabled_standard_fields: string[];
  email_template?: EmailTemplate;
}
