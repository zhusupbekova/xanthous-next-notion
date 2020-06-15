import { GlobalStyles } from '../components/layouts/globalStyles'
import Footer from '../components/layouts/footer'
import { IntlProvider } from 'react-intl'
import en from '../data/i18n/en_US'
import zh from '../data/i18n/zh_CN'

const i18n = {
  messages: {
    en,
    zh,
  },
}

export default ({ Component, pageProps }) => (
  <IntlProvider locale={'en'} messages={i18n.messages['en'] as any}>
    <GlobalStyles />
    <Component {...pageProps} />
    <Footer />
  </IntlProvider>
)
