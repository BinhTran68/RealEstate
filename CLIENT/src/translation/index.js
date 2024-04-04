import translationVI  from '~/translation/vi/vi.json'
import translationEN  from '~/translation/en/en.json'
import { initReactI18next } from 'react-i18next'
import i18next from 'i18next'

const resources = {
    en: { translation: translationEN },
    vi: { translation: translationVI }
  };

i18next.use(initReactI18next).init({
    lng: 'en', 
    debug: true,
    resources
})

