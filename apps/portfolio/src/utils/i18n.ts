export const tData = (field: { EN?: string; VN?: string } | string | undefined | null, lang: 'EN' | 'VN'): string => {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang] || field['EN'] || '';
};
