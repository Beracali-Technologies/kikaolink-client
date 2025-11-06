import { EmailTemplate } from './emailTemplate';
import { EmailDummyData } from './emailDummyData';

export interface EmailPreviewData {
  subject: string;
  template: EmailTemplate;
  content: string;
  dummy_data: EmailDummyData;
}
