import {createI18n} from 'vue-i18n'

import pt from '@/i18n/locales/pt.json'
import en from '@/i18n/locales/en.json'


export const originI18n = createI18n({
    legacy: false,
    locale: 'pt',
    fallbackLocale: 'en',
    messages: {en, pt}

})