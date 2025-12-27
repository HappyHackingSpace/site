export default async function submit(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body

    try {
      // 1. Önce subscriber'ı sisteme ekle
      const subscriberResponse = await fetch('https://api.sender.net/v2/subscribers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDER_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          firstname: name
        })
      })

      if (!subscriberResponse.ok) {
        const errorData = await subscriberResponse.text()
        console.error('Subscriber Creation Error:', subscriberResponse.status, errorData)
        return res.status(subscriberResponse.status).json({ 
          error: 'Failed to add subscriber',
          details: errorData 
        })
      }

      // 2. Sonra subscriber'ı gruba ekle
      const groupResponse = await fetch('https://api.sender.net/v2/subscribers/groups/aAOJ0P', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDER_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          subscribers: [email]
        })
      })

      if (!groupResponse.ok) {
        const errorData = await groupResponse.text()
        console.error('Group Addition Error:', groupResponse.status, errorData)
        return res.status(groupResponse.status).json({ 
          error: 'Failed to add subscriber to group',
          details: errorData 
        })
      }

      const result = await groupResponse.json()
      res.status(200).json({ success: true, data: result })
      
    } catch (error) {
      console.error('API Request Error:', error)
      res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
