export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 2 * 1024 * 1024; // 2MB

  if (!validTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file type. Please use: ${validTypes.map(t => t.replace('image/', '')).join(', ')}`
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `File too large. Maximum size is 2MB. Your file is ${formatFileSize(file.size)}`
    };
  }

  return { isValid: true };
};
