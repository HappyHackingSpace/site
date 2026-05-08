import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const I18nContext = createContext({
  locale: 'en',
  t: () => '',
  setLocale: () => {}
})

export const supportedLocales = ['en', 'tr', 'kr']
export const defaultLocale = 'en'

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
}

function interpolate(template, vars) {
  if (!template || typeof template !== 'string') return template
  return template.replace(/\{(\w+)\}/g, (_, key) => (vars && vars[key] !== undefined ? vars[key] : `{${key}}`))
}

function detectLocaleFromCountry(countryCode) {
  if (countryCode === 'TR') return 'tr'
  if (countryCode === 'KR' || countryCode === 'KP') return 'kr'
  return null
}

function detectLocaleFromNavigator() {
  const lang = (navigator.language || '').toLowerCase()
  if (lang.startsWith('tr')) return 'tr'
  if (lang.startsWith('ko')) return 'kr'
  return null
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(defaultLocale)
  const [translations, setTranslations] = useState({})
  const [loaded, setLoaded] = useState(false)

  const loadTranslations = useCallback(async (lang) => {
    try {
      const data = await import(`../languages/${lang}.json`)
      setTranslations(data.default || data)
      setLoaded(true)
    } catch {
      if (lang !== defaultLocale) {
        const fallback = await import(`../languages/${defaultLocale}.json`)
        setTranslations(fallback.default || fallback)
      }
      setLoaded(true)
    }
  }, [])

  const setLocale = useCallback((lang) => {
    const normalized = supportedLocales.includes(lang) ? lang : defaultLocale
    setLocaleState(normalized)
    if (typeof window !== 'undefined') {
      localStorage.setItem('hhs-locale', normalized)
    }
    loadTranslations(normalized)
  }, [loadTranslations])

  useEffect(() => {
    let mounted = true

    const init = async () => {
      let detected = defaultLocale

      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('hhs-locale')
        if (saved && supportedLocales.includes(saved)) {
          detected = saved
        } else {
          try {
            const res = await fetch('https://ipapi.co/country/', { signal: AbortSignal.timeout(3000) })
            if (res.ok) {
              const country = await res.text()
              const fromCountry = detectLocaleFromCountry(country.trim().toUpperCase())
              if (fromCountry) detected = fromCountry
              else {
                const fromNav = detectLocaleFromNavigator()
                if (fromNav) detected = fromNav
              }
            } else {
              const fromNav = detectLocaleFromNavigator()
              if (fromNav) detected = fromNav
            }
          } catch {
            const fromNav = detectLocaleFromNavigator()
            if (fromNav) detected = fromNav
          }
        }
      }

      if (mounted) {
        setLocaleState(detected)
        await loadTranslations(detected)
      }
    }

    init()
    return () => { mounted = false }
  }, [loadTranslations])

  const t = useCallback((key, vars) => {
    const value = getNestedValue(translations, key)
    if (value === undefined) return key
    return interpolate(value, vars)
  }, [translations])

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  return useContext(I18nContext)
}
