import nextVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextVitals,
  { ignores: ['.next/**', 'public/**'] },
  {
    rules: {
      '@next/next/no-img-element': 'off',
      'react/no-unescaped-entities': 'off',
      eqeqeq: 'warn',
      // React Compiler rules from react-hooks v7. The site does not use the
      // compiler, and these flag working three.js and effect code.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off'
    }
  }
]

export default config
