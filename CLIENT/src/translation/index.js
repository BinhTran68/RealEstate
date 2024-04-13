import translationVI  from '~/translation/vi/vi.json'
import translationEN  from '~/translation/en/en.json'
import { initReactI18next } from 'react-i18next'
import i18next from 'i18next'

const resources = {
    en: { translation: translationEN },
    vi: { translation: translationVI }
  };

  const missingKeyHandler = (lng, ns, key, fallbackValue) => {
    // Không log nếu fallbackValue là undefined (không có giá trị mặc định)
    if (fallbackValue !== undefined) {
      console.warn(`Missing translation key '${key}' for language '${lng}' and namespace '${ns}'`);
    }
    // Trả về giá trị mặc định nếu có
    return fallbackValue;
  };

i18next.use(initReactI18next).init({
    lng: 'en', 
    debug: true,
    resources,
    missingKeyHandler 
})

