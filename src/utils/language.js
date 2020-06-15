export const configureLanguage = ctx => {
  const { req } = ctx

  const language = req
    ? req.headers['accept-language']
    : window.navigator.language
  return language
}
