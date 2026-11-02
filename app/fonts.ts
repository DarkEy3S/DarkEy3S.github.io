import { JetBrains_Mono, Manrope, Noto_Sans_Armenian } from 'next/font/google';
import { cookieAttrs } from '@/components/prefs';

const sans = Manrope({ subsets: ['latin', 'cyrillic'], variable: '--font-sans' });
const arm = Noto_Sans_Armenian({ subsets: ['armenian'], variable: '--font-arm' });
const mono = JetBrains_Mono({ subsets: ['latin', 'cyrillic'], variable: '--font-mono' });

export const fontVars = `${sans.variable} ${arm.variable} ${mono.variable}`;

export const themeScript = `try{var t=(document.cookie.match(/(?:^|; )portfolio_theme=(dark|light)(?:;|$)/)||[])[1];if(!t){try{t=localStorage.getItem('theme');localStorage.removeItem('theme')}catch(e){}if(t==='dark'||t==='light')document.cookie='portfolio_theme='+t+'${cookieAttrs}'+(location.protocol==='https:'?'; Secure':'');else t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){}`;
