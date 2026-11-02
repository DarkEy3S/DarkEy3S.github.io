export const cookieAttrs = '; Path=/; Max-Age=31536000; SameSite=Lax';

export const setPref = (key: 'theme' | 'locale', value: string) => {
  document.cookie = `portfolio_${key}=${value}${cookieAttrs}${location.protocol === 'https:' ? '; Secure' : ''}`;
};
