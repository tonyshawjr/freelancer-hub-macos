export type MainCategory = 
  | 'Website Issues'
  | 'Content Updates'
  | 'Maintenance'
  | 'Client Requests';

export type SubCategory = {
  'Website Issues': 'Site Down' | 'Performance Problem' | 'Error/Bug' | 'Security Alert';
  'Content Updates': 'Text Changes' | 'Image Updates' | 'New Page' | 'Form Changes';
  'Maintenance': 'WordPress Update' | 'Plugin Update' | 'Backup' | 'SSL/Domain';
  'Client Requests': 'General Question' | 'Training Help' | 'Access Issue' | 'Other Request';
};

export const TICKET_CATEGORIES: Record<MainCategory, string[]> = {
  'Website Issues': ['Site Down', 'Performance Problem', 'Error/Bug', 'Security Alert'],
  'Content Updates': ['Text Changes', 'Image Updates', 'New Page', 'Form Changes'],
  'Maintenance': ['WordPress Update', 'Plugin Update', 'Backup', 'SSL/Domain'],
  'Client Requests': ['General Question', 'Training Help', 'Access Issue', 'Other Request']
};
