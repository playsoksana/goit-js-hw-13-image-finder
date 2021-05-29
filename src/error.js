import { defaults } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import { alert, defaultModules, defaultStack } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
defaultModules.set(PNotifyMobile, {});
defaults.styling = 'material';

export default function error(err) {
   alert({text: 'not found!', delay: 3000, maxTextHeight: null})
}
