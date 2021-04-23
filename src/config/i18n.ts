import { findBestAvailableLanguage } from 'react-native-localize'
import { I18nManager } from 'react-native'
import I18n, { TranslateOptions, Scope } from 'i18n-js'
import memoize from 'lodash/memoize'
import { setLocale } from 'yup'
import fi from 'date-fns/locale/fi'
import enUS from 'date-fns/locale/en-US'
import { format } from 'date-fns'

const translationGetters: {
  [key: string]: () => Record<string, unknown>
} = {
  // lazy requires (metro bundler does not support symlinks)
  fi: () => require('../translations/fi.json'),
  en: () => require('../translations/en.json')
}

export const setI18nConfig = (): void => {
  // fallback if no available language fits
  const fallback = { languageTag: 'en', isRTL: false }

  const { languageTag, isRTL } =
    findBestAvailableLanguage(Object.keys(translationGetters)) || fallback

  // clear translation cache
  if (translate?.cache.clear) translate.cache.clear()
  // update layout direction
  I18nManager.forceRTL(isRTL)

  // set i18n-js config
  I18n.translations = { [languageTag]: translationGetters[languageTag]() }
  I18n.locale = languageTag
}

const translate = memoize(
  (key?: Scope, config?: TranslateOptions | undefined) =>
    I18n.t(key ?? '', config),
  (key?: Scope, config?: TranslateOptions | undefined) =>
    config ? key + JSON.stringify(config) : key
)

setLocale({
  string: {
    email: 'ERROR.NOT_VALID_EMAIL',
    min: 'ERROR.FIELD_TOO_SHORT',
    max: 'ERROR.FIELD_TOO_LONG'
  },
  mixed: {
    required: 'ERROR.FIELD_EMPTY'
  }
})

export const localizedFormat = (date: Date, f: string): string => {
  return format(date, f, {
    locale: I18n.currentLocale() === 'fi' ? fi : enUS
  })
}

export default translate
