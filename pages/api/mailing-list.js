const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW = 10 * 60 * 1000
const RATE_LIMIT_MAX = 3

function getRateLimitKey(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown'
  )
}

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (rateLimitMap.size > 10000) {
    for (const [key, val] of rateLimitMap) {
      if (now - val.windowStart > RATE_LIMIT_WINDOW) {
        rateLimitMap.delete(key)
      }
    }
  }

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, windowStart: now })
    return false
  }

  entry.count++
  if (entry.count > RATE_LIMIT_MAX) {
    return true
  }

  return false
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(email) {
  return typeof email === 'string' && EMAIL_REGEX.test(email) && email.length <= 254
}

function isGibberishName(name) {
  if (typeof name !== 'string') return true
  const trimmed = name.trim()
  if (trimmed.length < 2) return true

  if (!/[aeiouyAEIOUY]/.test(trimmed)) return true

  const letters = trimmed.replace(/[^a-zA-Z]/g, '')
  if (letters.length >= 6) {
    const vowels = (letters.match(/[aeiouyAEIOUY]/g) || []).length
    if (vowels / letters.length < 0.15) return true
  }

  if (trimmed.length > 30 && !trimmed.includes(' ')) return true

  if (letters.length >= 4) {
    const midSection = letters.slice(1, -1)
    const upperInMid = (midSection.match(/[A-Z]/g) || []).length
    if (upperInMid / midSection.length > 0.5) return true
  }

  return false
}

function normalizeEmail(email) {
  const [localPart, domain] = email.split('@')
  if (domain?.toLowerCase() === 'gmail.com') {
    const cleanLocal = localPart.split('+')[0].replace(/\./g, '')
    return `${cleanLocal}@gmail.com`
  }
  return email
}

export default async function submit(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, website, _ts } = req.body

  if (website) {
    return res.status(200).json({ success: true })
  }

  if (_ts) {
    const elapsed = Date.now() - Number(_ts)
    if (elapsed < 2000) {
      return res.status(200).json({ success: true })
    }
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  if (isGibberishName(name)) {
    return res.status(400).json({ error: 'Invalid name' })
  }

  const ip = getRateLimitKey(req)
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' })
  }

  const normalizedEmail = normalizeEmail(email.trim().toLowerCase())

  try {
    const createResponse = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: normalizedEmail,
        firstName: name.trim(),
        source: 'website',
        userGroup: 'Newsletter'
      })
    })

    if (!createResponse.ok) {
      const errorData = await createResponse.json().catch(() => ({}))

      if (errorData.message?.includes('already exists') || createResponse.status === 409) {
        const updateResponse = await fetch('https://app.loops.so/api/v1/contacts/update', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: normalizedEmail,
            firstName: name.trim(),
            source: 'website',
            userGroup: 'Newsletter'
          })
        })

        if (!updateResponse.ok) {
          const updateError = await updateResponse.text()
          console.error('Contact Update Error:', updateResponse.status, updateError)
          return res.status(updateResponse.status).json({
            error: 'Failed to update contact',
            details: updateError
          })
        }

        const result = await updateResponse.json()
        return res.status(200).json({ success: true, data: result })
      }

      console.error('Contact Creation Error:', createResponse.status, JSON.stringify(errorData))
      return res.status(createResponse.status).json({
        error: 'Failed to add contact',
        details: errorData
      })
    }

    const result = await createResponse.json()
    res.status(200).json({ success: true, data: result })

  } catch (error) {
    console.error('API Request Error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    })
  }
}
