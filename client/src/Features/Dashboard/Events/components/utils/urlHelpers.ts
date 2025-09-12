// Utility function to generate URL slug from event name
export const generateUrlSlug = (title: string): string => {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric with hyphens
    .replace(/(^-|-$)+/g, '')     // Remove leading/trailing hyphens
    .substring(0, 50);            // Limit length
};

// Generate full event URL
export const generateEventUrl = (title: string, baseUrl: string = 'kikaolink.com/events'): string => {
  const slug = generateUrlSlug(title);
  return slug ? `${baseUrl}/${slug}` : '';
};
