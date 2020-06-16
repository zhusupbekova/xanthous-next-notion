import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { IntlProvider } from 'react-intl'
import NProgress from 'nprogress'

import { GlobalStyles } from '../components/layouts/globalStyles'
import Footer from '../components/layouts/footer'
import '../styles/nprogress.css'
import en from '../data/i18n/en_US'
import zh from '../data/i18n/zh_CN'

const i18n = {
  messages: {
    en,
    zh,
  },
}

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  const lang = (router.query.lang as string) || 'en'

  useEffect(() => {
    NProgress.configure({
      minimum: 0.1,
      speed: 1000,
      easing: 'ease',
      trickleSpeed: 500,
      showSpinner: false,
    })

    const handleComplete = () => NProgress.done()
    const handleStart = (url: string) =>
      url !== router.pathname && NProgress.start()

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return (
    <IntlProvider locale={lang} messages={i18n.messages[lang] as any}>
      <GlobalStyles />
      <Component {...pageProps} />
      <Footer />
    </IntlProvider>
  )
}

export default App
