export interface TemplateProps {
    event: {
      id: number | string;
      title: string;
      description?: string;
      startDate?: string;
      endDate?: string;
      startTime?: string;
      endTime?: string;
      location?: string | any;
      custom_slug?: string;
      status?: string;
      is_live?: boolean;
    };
    registrationLink: string;
  }