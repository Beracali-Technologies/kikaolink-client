f 
class TemplatePreviewService {
    private static instance: TemplatePreviewService;
    private previewCache = new Map<string, string>();
  
    static getInstance(): TemplatePreviewService {
      if (!TemplatePreviewService.instance) {
        TemplatePreviewService.instance = new TemplatePreviewService();
      }
      return TemplatePreviewService.instance;
    }
  
    // Generate a color palette based on template
    getTemplateColors(templateId: string) {
      const colorPalettes = {
        template1: {
          primary: '#4c1d95',
          secondary: '#1e293b',
          accent: '#10b981',
          bg: 'from-slate-900 via-purple-900 to-slate-900'
        },
        template2: {
          primary: '#3b82f6',
          secondary: '#ef4444',
          accent: '#10b981',
          bg: 'from-white to-gray-50'
        },
        template3: {
          primary: '#2563eb',
          secondary: '#7c3aed',
          accent: '#10b981',
          bg: 'from-white via-blue-50 to-indigo-100'
        }
      };
      
      return colorPalettes[templateId as keyof typeof colorPalettes] || colorPalettes.template1;
    }
  
    // Get preview HTML for a template
    getPreviewHTML(templateId: string, eventData: any) {
      const colors = this.getTemplateColors(templateId);
      
      const html = `
        <div class="min-h-[200px] bg-gradient-to-br ${colors.bg}">
          <div class="p-4">
            <h3 class="text-white text-lg font-bold truncate">${eventData.title || 'Your Event'}</h3>
            <p class="text-white/80 text-sm mt-1">Live preview of ${templateId}</p>
            <button class="mt-3 px-4 py-2 bg-white text-${templateId === 'template2' ? 'gray-800' : colors.primary} rounded-lg">
              Preview Template
            </button>
          </div>
        </div>
      `;
      
      return html;
    }
  }
  
  export const templatePreviewService = TemplatePreviewService.getInstance();