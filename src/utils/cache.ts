import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import stylis from 'stylis';

export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [stylis.prefixer, rtlPlugin],
  prepend: true,
});