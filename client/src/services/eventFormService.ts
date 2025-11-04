import api from '@/lib/axios';


export const eventFormService = {
    getFormConfig: async (eventId: number) => {
        const response = await api.get(`/api/events/${eventId}/form-config`);
        return response.data;
    },

    getFormConfigBySlug: async (eventSlug: string) => {
        const response = await api.get(`/api/events/slug/${eventSlug}/form-config`);
        return response.data;
    },


  saveFormConfig: async (eventId: number, fields: any[]) => {
      const response = await api.post(`/api/events/${eventId}/form-config`, {
          fields: fields.map(field => ({
              id: field.id,
              label: field.label,
              fieldType: field.fieldType,
              required: field.required,
              options: field.options,
              isStandard: field.isStandard,
              systemName: field.systemName
          }))
      });
      return response.data;
  },

  getEventByCustomSlug: async (customSlug: string): Promise<{ id: number; title: string }> => {
   const response = await api.get(`/api/public/events/custom/${customSlug}`);
   return response.data;
 },

  getPublicFormConfig: async (eventId: number): Promise<{ fields: Field[] }> => {
  const response = await api.get(`/api/public/events/${eventId}/form-config`);
  return response.data;
},

    getPublicFormConfigBySlug: async (eventSlug: string) => {
        const response = await api.get(`/api/events/slug/${eventSlug}/public-form-config`);
        return response.data;
    }
};
