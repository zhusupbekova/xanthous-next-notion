import { GlobalStyles } from '../components/layouts/globalStyles'
import Footer from '../components/layouts/footer'
// import { configureLanguage } from '../utils/language'
import { IntlProvider } from 'react-intl'
import en from '../data/i18n/en_US'
import zh from '../data/i18n/zh_CN'
import { useRouter } from 'next/router'

const i18n = {
  messages: {
    en,
    zh,
  },
}

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  const lang = (router.query.lang as string) || 'en'
  // const langKey = props.langKey || 'en'
  return (
    <IntlProvider locale={lang} messages={i18n.messages[lang] as any}>
      <GlobalStyles />
      <Component {...pageProps} />
      <Footer />
    </IntlProvider>
  )
}

// App.getInitialProps = async ({ Component, ctx }) => {
//   const language = configureLanguage(ctx)
//   console.log('language', language)

//   return { language }
// }

export default App
