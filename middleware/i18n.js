export default function ({
  isHMR,
  app,
  store,
  route,
  params,
  error,
  redirect,
}) {
  console.log('inside middleware');
  const defaultLocale = app.i18n.fallbackLocale;
  //  Get locale cookie
  const localeCookie = app.$cookies.get('locale');

  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return;
  }

  // Get locale from cookie, or set default
  const locale = localeCookie || defaultLocale;

  if (!app.store.state.states.locales.includes(locale)) {
    return error({ message: 'This page could not be found.', statusCode: 404 });
  }

  // Set locale (default)
  store.commit('SET_LANG', locale);
  app.i18n.locale = app.store.state.states.locale;

  //  Set Cookie to remember locale
  app.$cookies.set('locale', locale, {
    path: '/',
  });
}
