
export const SITE_CATEGORIES = [
  'Technology',
  'Programming', 
  'Career',
  'Jobs',
  'AI & Machine Learning',
  'Web Development',
  'Mobile Development',
  'DevOps',
  'Cybersecurity',
  'Data Science'
];

export const getCategoryPath = (category: string) => {
  return `/category/${encodeURIComponent(category.toLowerCase())}`;
};
