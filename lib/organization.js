// Official registration details. Google for Nonprofits and other reviewers
// match these against the registry, so keep them verbatim.
export const org = {
  legalName: 'Mezopotamya Teknoloji, Bilim ve Kültür Derneği',
  publicName: 'Happy Hacking Space',
  shortName: 'HHS',
  registryLabel: 'Kütük No',
  registryNumber: '21-020-179',
  email: 'team@happyhacking.space',
  url: 'https://happyhacking.space/',
  address: {
    lines: [
      'Talaytepe Mah. 4009/1 Sokak',
      'Ay Yapi Corner Ofis A Blok',
      'Dis Kapi No: 4A Ic Kapi No: 4',
      'Diyarbakir, Turkey 21070'
    ],
    street:
      'Talaytepe Mah. 4009/1 Sokak, Ay Yapi Corner Ofis A Blok, Dis Kapi No: 4A Ic Kapi No: 4',
    locality: 'Diyarbakir',
    postalCode: '21070',
    country: 'Turkey',
    countryCode: 'TR'
  }
}

export const registry = `${org.registryLabel}: ${org.registryNumber}`

export const fullAddress = org.address.lines.join(', ')

export const status = {
  en: 'Nonprofit association (dernek) registered in Türkiye',
  tr: "Türkiye'de kayıtlı, kâr amacı gütmeyen dernek"
}

export const identityStatement = {
  en: `${org.publicName} is the public name of ${org.legalName}, a nonprofit association registered in Türkiye (${registry}).`,
  tr: `${org.publicName}, Türkiye'de kayıtlı kâr amacı gütmeyen bir dernek olan ${org.legalName}'nin kamuya açık adıdır (${registry}).`
}
