export const escapeHtml = (str) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export const decodeEscapeString = (str) =>
  str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, `'`)
    .replace(/&Aring;/g, 'Å')
    .replace(/&eacute;/g, 'é')
    .replace(/&ntilde;/g, 'ñ')
    .replace(/&ecirc;/g, 'ê')
    .replace(/&iacute;/g, 'í');
