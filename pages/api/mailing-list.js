export default async function submit(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body

    try {
      const createResponse = await fetch('https://app.loops.so/api/v1/contacts/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          firstName: name,
          source: 'website',
          userGroup: 'Newsletter'
        })
      })

      if (!createResponse.ok) {
        const errorData = await createResponse.json().catch(() => ({}))

        // If contact already exists, update instead
        if (errorData.message?.includes('already exists') || createResponse.status === 409) {
          const updateResponse = await fetch('https://app.loops.so/api/v1/contacts/update', {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email,
              firstName: name,
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
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
