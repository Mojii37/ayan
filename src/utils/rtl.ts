import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import type { Plugin } from 'stylis';

export const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer as Plugin, rtlPlugin as Plugin],
  prepend: true,
});