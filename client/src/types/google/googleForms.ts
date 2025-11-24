
export interface GoogleForm {
    id: string;
    name: string;
    created_time: string;
    modified_time: string;
  }
  
  export interface GoogleFormDetails {
    form_id: string;
    title: string;
    questions: {
      question_id: string;
      title: string;
      type: string;
    }[];
    responder_uri: string;
  }
  
  export interface FormResponse {
    response_id: string;
    create_time: string;
    last_submitted_time: string;
    answers: Record<string, string>;
  }
  