import { useTranslation } from 'react-i18next'
import { Button, Flex, Text } from 'theme-ui'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
  ]

  return (
    <Flex sx={{ gap: 2, alignItems: 'center' }}>
      
      {languages.map((lang) => (
        <Button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          variant={i18n.language === lang.code ? 'primary' : 'outline'}
          sx={{
            fontSize: 1,
            py: 1,
            px: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            opacity: i18n.language === lang.code ? 1 : 0.7,
            '&:hover': {
              opacity: 1
            }
          }}
        >
          <span>{lang.flag}</span>
          <span>{lang.name}</span>
        </Button>
      ))}
    </Flex>
  )
}

export default LanguageSwitcher