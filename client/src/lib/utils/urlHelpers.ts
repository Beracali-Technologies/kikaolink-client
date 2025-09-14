// Utility function to generate URL slug from event name
export const generateUrlSlug = (title: string): string => {
  if (!title) return '';

  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric with hyphens
    .replace(/(^-|-$)+/g, '')     // Remove leading/trailing hyphens
    .substring(0, 50);            // Limit length
};

// Generate relative event URL path (for frontend routing)
export const generateEventUrlPath = (title: string): string => {
  const slug = generateUrlSlug(title);
  return slug ? `/events/${slug}` : '';
};

// Generate complete absolute URL for production
export const generateAbsoluteEventUrl = (title: string): string => {
  const slug = generateUrlSlug(title);
  const baseUrl = window.location.origin; // Gets http://localhost:5173 or https://kikaolink.com
  return slug ? `${baseUrl}/events/${slug}` : '';
};

// For copying to clipboard - shows nice format
export const generateDisplayEventUrl = (title: string): string => {
  const slug = generateUrlSlug(title);
  // In development: shows localhost:5173/events/slug
  // In production: shows kikaolink.com/events/slug
  return slug ? `${window.location.host}/events/${slug}` : '';
};
