import { GlobalStyles } from '../components/layouts/globalStyles'
import Footer from '../components/layouts/footer'
// import { configureLanguage } from '../utils/language'
import { IntlProvider } from 'react-intl'
import en from '../data/i18n/en_US'
import zh from '../data/i18n/zh_CN'

const i18n = {
  messages: {
    en,
    zh,
  },
}

const App = ({ Component, pageProps }) => (
  <IntlProvider locale={'en'} messages={i18n.messages['en'] as any}>
    <GlobalStyles />
    <Component {...pageProps} />
    <Footer />
  </IntlProvider>
)

// App.getInitialProps = async ({ Component, ctx }) => {
//   const language = configureLanguage(ctx)
//   console.log('language', language)

//   return { language }
// }

export default App
