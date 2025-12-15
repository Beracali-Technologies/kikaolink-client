import { EmailTemplate } from './emailTemplate';
import { EmailDummyData } from './emailDummyData';


export interface EmailPreviewData {
  subject: string;
  content?: string;
  template: EmailTemplate;
  dummy_data?: EmailDummyData; 
}