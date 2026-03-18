import Headphones from '@/components/svgs/devices/Headphones';
import Keyboard from '@/components/svgs/devices/Keyboard';
import Laptop from '@/components/svgs/devices/Laptop';
import Monitor from '@/components/svgs/devices/Monitor';
import Mouse from '@/components/svgs/devices/Mouse';
import Phone from '@/components/svgs/devices/Phone';





export const devices = [
  {
    name: 'Acer Nitro 5 15.6"in 12th Gen Intel Core i5 32GB 1.5TB',
    icon: <Laptop className="size-4" />,
  },
  {
    name: 'Acer Nitro Monitor VG271U M3 (27 inch, WQHD 2560x1440, IPS, 180Hz, 0.5ms)',
    icon: <Monitor className="size-4" />,
  },
  {
    name: 'Lenovo Monitor (21 inch, HD 1920x1080, IPS, 75Hz)',
    icon: <Monitor className="size-4" />,
  },
  {
    name: 'Portronics Hydra 10 75% Brown-switches Mechanical Keyboard',
    icon: <Keyboard className="size-4" />,
  },
  {
    name: 'Circle Gaming 100% Membrane Keyboard',
    icon: <Keyboard className="size-4" />,
  },
  {
    name: 'Razer Viper Mini Extralight Gaming Mouse',
    icon: <Mouse className="size-4" />,
  },
  {
    name: 'Portronics Toad Ergo Vertical Vertical Mouse',
    icon: <Mouse className="size-4" />,
  },
  {
    name: 'Razer Barracuda X Wireless Gaming Headset',
    icon: <Headphones className="size-4" />,
  },
  {
    name: 'RedGear Cosmo 7.1 Wired Gaming Headphones',
    icon: <Headphones className="size-4" />,
  },
  {
    name: 'Apple iPhone 17 (256 GB)',
    icon: <Phone className="size-4" />,
  },
  {
    name: 'Xiaomi Mi 11x (128 GB)',
    icon: <Phone className="size-4" />,
  },
  {
    name: 'Apple iPad 2019 (128 GB)',
    icon: <Phone className="size-4" />,
  },
];

export const webExtensions = [
  { name: 'Unhook', href: 'https://unhook.app/' },
  {
    name: 'uBlock Origin Lite',
    href: 'https://chromewebstore.google.com/detail/ublock-origin-lite/ddkjiahejlhfcafbddmgiahcphecmpfh?hl=en',
  },
  {
    name: 'React Developer Tools',
    href: 'https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en',
  },
  { name: 'daily.dev', href: 'https://daily.dev/' },
  { name: 'Wappalyzer', href: 'https://www.wappalyzer.com/' },
  {
    name: 'ColorZilla',
    href: 'https://chromewebstore.google.com/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?hl=en',
  },
];

export const software = [
  { name: 'VSCode', href: 'https://code.visualstudio.com/' },
  { name: 'Notion', href: 'https://www.notion.so/desktop' },
  { name: 'Claude Code', href: 'https://claude.com/product/claude-code' },
  { name: 'OBS Studio', href: 'https://obsproject.com/' },
  { name: 'VLC', href: 'https://www.videolan.org/vlc/' },
  { name: 'Warp', href: 'https://www.warp.dev/' },
];