import { useState, useMemo } from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Grid,
  Badge,
  Card,
  Flex,
  Label,
  Checkbox
} from 'theme-ui'
import Head from 'next/head'
import Meta from '@happyhackingspace/meta'
import Nav from '../components/nav'
import BGImg from '../components/background-image'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import Image from 'next/image'

// General Support Card Component
const DonationCard = ({ title, description, payment_link, contact_required }) => (
  <Card
    sx={{
      bg: 'white',
      p: 4,
      borderRadius: 'extra',
      boxShadow: 'card',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      transition: 'transform 0.2s ease',
      '&:hover': {
        transform: 'translateY(-4px)'
      }
    }}
  >
    <Heading as="h3" variant="subheadline" sx={{ mb: 2 }}>
      {title}
    </Heading>
    <Text as="p" variant="caption" sx={{ color: 'slate', mb: 4 }}>
      {description}
    </Text>
    <Box sx={{ mt: 'auto' }}>
      {payment_link && (
        <Button as="a" href={payment_link} target="_blank" variant="cta" sx={{ width: '100%' }}>
          Donate
        </Button>
      )}
      {contact_required && (
        <Button
          as="a"
          href={`https://wa.me/905347001757?text=${encodeURIComponent("Hi, I'd like to get information about donations.")}`}
          target="_blank"
          variant="outline"
          sx={{ width: '100%', mt: payment_link ? 2 : 0, cursor: 'pointer' }}
        >
          WhatsApp Contact
        </Button>
      )}
    </Box>
  </Card>
)

// Product Need Card Component
const ProductCard = ({ image, title, category, description, current_qty, max_qty, link, urgency, is_completed }) => {
  const progress = Math.min(100, (current_qty / max_qty) * 100)

  return (
    <Card
      sx={{
        bg: 'white',
        borderRadius: 'extra',
        boxShadow: 'card',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        opacity: is_completed ? 0.7 : 1,
        filter: is_completed ? 'grayscale(0.5)' : 'none',
        position: 'relative'
      }}
    >
      {urgency === 'Acil' && !is_completed && (
        <Badge
          variant="pill"
          sx={{
            position: 'absolute',
            top: 2,
            right: 2,
            bg: 'red',
            color: 'white',
            zIndex: 1
          }}
        >
          Urgent
        </Badge>
      )}
      <Box sx={{ height: '200px', position: 'relative', bg: 'smoke' }}>
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
          />
        )}
        {is_completed && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              bg: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Badge variant="pill" sx={{ bg: 'green', color: 'white', px: 3, py: 1, fontSize: 2 }}>
              Completed
            </Badge>
          </Box>
        )}
      </Box>
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Badge variant="pill" sx={{ width: 'fit-content', mb: 2, bg: 'smoke', color: 'slate' }}>
          {category}
        </Badge>
        <Heading as="h3" variant="headline" sx={{ fontSize: 3, mb: 2 }}>
          {title}
        </Heading>
        <Text as="p" sx={{ color: 'slate', fontSize: 1, mb: 3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {description}
        </Text>

        <Box sx={{ mt: 'auto' }}>
          <Flex sx={{ justifyContent: 'space-between', mb: 1, fontSize: 1 }}>
            <Text sx={{ fontWeight: 'bold' }}>Progress</Text>
            <Text sx={{ color: 'slate' }}>{current_qty} / {max_qty}</Text>
          </Flex>
          <Box sx={{ height: '8px', bg: 'smoke', borderRadius: 'circle', overflow: 'hidden', mb: 3 }}>
            <Box
              sx={{
                height: '100%',
                bg: is_completed ? 'green' : 'red',
                width: `${progress}%`,
                transition: 'width 0.5s ease-in-out'
              }}
            />
          </Box>
          <Button
            as="a"
            href={link}
            target="_blank"
            disabled={is_completed}
            variant={is_completed ? 'outline' : 'cta'}
            sx={{
              width: '100%',
              pointerEvents: is_completed ? 'none' : 'auto',
              cursor: is_completed ? 'not-allowed' : 'pointer'
            }}
          >
            {is_completed ? 'Thanks!' : 'Buy'}
          </Button>
        </Box>
      </Box>
    </Card>
  )
}

// Helper Component: Tab Button
const TabButton = ({ active, children, onClick }) => (
  <Button
    onClick={onClick}
    sx={{
      bg: active ? 'red' : 'transparent',
      color: active ? 'white' : 'slate',
      borderRadius: 'extra',
      px: 4,
      py: 2,
      fontSize: 2,
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'all 0.2s',
      '&:hover': {
        bg: active ? 'red' : 'smoke',
      }
    }}
  >
    {children}
  </Button>
)

export default function BagisPage({ supportNeeds = [], productNeeds = [] }) {
  const [activeTab, setActiveTab] = useState('products')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showOnlyUrgent, setShowOnlyUrgent] = useState(false)

  // Dynamically extract categories from product list
  const categories = useMemo(() => {
    const cats = productNeeds.map(p => p.category).filter(Boolean)
    return ['All', ...[...new Set(cats)].sort()]
  }, [productNeeds])

  // Filtered product list
  const filteredProducts = useMemo(() => {
    return productNeeds.filter(p => {
      const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory
      const urgencyMatch = !showOnlyUrgent || p.urgency === 'Acil' || p.urgency === 'Urgent'
      return categoryMatch && urgencyMatch
    })
  }, [productNeeds, selectedCategory, showOnlyUrgent])

  return (
    <>
      <Meta
        as={Head}
        title="Donate | Happy Hacking Space"
        description="Donate and support the Happy Hacking Space community."
      />
      <ForceTheme theme="light" />
      <Nav />
      <Box
        as="header"
        sx={{
          bg: 'dark',
          pt: [5, 6],
          pb: [4, 5],
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <BGImg
          src="/donate/0color_pop.jpg"
          alt="Donate"
          priority
          gradient="linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6))"
        />
        <Container sx={{ position: 'relative', zIndex: 1, textShadow: 'text' }}>
          <Heading
            as="h1"
            variant="title"
            sx={{
              color: 'white',
              fontSize: [5, 6],
              mb: 3
            }}
          >
            Growing with Your Support
          </Heading>
        </Container>
      </Box>

      <Container sx={{ mt: -4, position: 'relative', zIndex: 10 }}>
        {/* Tab Menu */}
        <Flex
          sx={{
            bg: 'white',
            borderRadius: 'extra',
            p: 1,
            boxShadow: 'elevated',
            width: 'fit-content',
            mx: 'auto',
            mb: 5,
            border: '1px solid',
            borderColor: 'smoke'
          }}
        >
          <TabButton active={activeTab === 'products'} onClick={() => setActiveTab('products')}>
            Product Needs
          </TabButton>
          <TabButton active={activeTab === 'support'} onClick={() => setActiveTab('support')}>
            Donation Support
          </TabButton>
        </Flex>

        <Box sx={{ minHeight: '60vh', pb: 6 }}>
          {activeTab === 'support' ? (
            <Box>
              <Box sx={{ textAlign: 'center', mb: 5 }}>
                <Heading as="h2" variant="title" sx={{ fontSize: [4, 5], mb: 2 }}>
                  General Support & Bill Assistance
                </Heading>
                <Text as="p" variant="subtitle" sx={{ color: 'slate' }}>
                  You can support the sustainability of our community.
                </Text>
              </Box>
              <Grid columns={[1, 2, 3]} gap={4}>
                {supportNeeds.map((need) => (
                  <DonationCard key={need.id} {...need} />
                ))}
              </Grid>
              {supportNeeds.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 5 }}>
                  <Text color="slate">No support items added yet.</Text>
                </Box>
              )}
            </Box>
          ) : (
            <Grid columns={[1, '220px 1fr']} gap={[4, 5]}>
              {/* Sidebar / Filtering */}
              <Box sx={{ position: ['static', 'sticky'], top: '100px', height: 'fit-content' }}>
                <Card sx={{ p: 4, bg: 'white', borderRadius: 'extra', boxShadow: 'card', border: '1px solid', borderColor: 'smoke' }}>
                  <Heading as="h3" sx={{ fontSize: 2, mb: 3, pb: 2, borderBottom: '1px solid', borderColor: 'smoke' }}>
                    Filter
                  </Heading>

                  <Box sx={{ mb: 4 }}>
                    <Label sx={{ mb: 3, fontWeight: 'bold', color: 'muted', fontSize: 0, textTransform: 'uppercase', letterSpacing: 'wider' }}>
                      CATEGORIES
                    </Label>
                    <Grid gap={2}>
                      {categories.map(cat => (
                        <Label key={cat} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: 1, py: 1, transition: 'color 0.2s', '&:hover': { color: 'red' } }}>
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === cat}
                            onChange={() => setSelectedCategory(cat)}
                            style={{ marginRight: '10px', accentColor: '#ff6259' }}
                          />
                          {cat}
                        </Label>
                      ))}
                    </Grid>
                  </Box>

                  <Box sx={{ pt: 3, borderTop: '1px solid', borderColor: 'smoke' }}>
                    <Label sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', fontSize: 1 }}>
                      <Checkbox
                        checked={showOnlyUrgent}
                        onChange={(e) => setShowOnlyUrgent(e.target.checked)}
                        sx={{ color: 'red' }}
                      />
                      Urgent Only
                    </Label>
                  </Box>

                  <Button
                    variant="outline"
                    sx={{ width: '100%', mt: 4, py: 2, fontSize: 1, borderRadius: 'circle' }}
                    onClick={() => { setSelectedCategory('All'); setShowOnlyUrgent(false); }}
                  >
                    Reset Filters
                  </Button>
                </Card>
              </Box>

              {/* Product List */}
              <Box>
                <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                  <Text sx={{ color: 'slate', fontWeight: 'bold' }}>
                    {filteredProducts.length} products found
                  </Text>
                </Flex>

                {filteredProducts.length > 0 ? (
                  <Grid columns={[1, 2, 3]} gap={3}>
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 6, bg: 'white', borderRadius: 'extra', border: '1px dashed', borderColor: 'muted' }}>
                    <Text sx={{ color: 'slate', fontSize: 2 }}>No products found matching your criteria.</Text>
                  </Box>
                )}
              </Box>
            </Grid>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const AirtablePlus = require('airtable-plus')
  const baseID = process.env.AIRTABLE_BASE_ID || 'appmOkTbDhAP3VmsI'
  const apiKey = process.env.AIRTABLE_PAT || process.env.AIRTABLE_API_KEY

  if (!apiKey) {
    return {
      props: { supportNeeds: [], productNeeds: [] },
      revalidate: 1
    }
  }

  try {
    const supportAirtable = new AirtablePlus({
      baseID,
      apiKey,
      tableName: process.env.AIRTABLE_SUPPORT_TABLE || 'DonationNeeds'
    })

    const productAirtable = new AirtablePlus({
      baseID,
      apiKey,
      tableName: process.env.AIRTABLE_PRODUCT_TABLE || 'ProductNeeds'
    })

    const [supportRecords, productRecords] = await Promise.all([
      supportAirtable.read({
        filterByFormula: '{visible} = 1',
        sort: [{ field: 'order', direction: 'asc' }]
      }),
      productAirtable.read({
        filterByFormula: '{visible} = 1'
      })
    ])

    const supportNeeds = supportRecords.map(r => ({
      id: r.id,
      title: r.fields.title || '',
      description: r.fields.description || '',
      type: r.fields.type || '',
      payment_link: r.fields.payment_link || null,
      contact_required: !!r.fields.contact_required,
      order: r.fields.order || 0
    }))

    const productNeeds = productRecords.map(r => ({
      id: r.id,
      title: r.fields.title || '',
      description: r.fields.description || '',
      image: r.fields.image?.[0]?.url || null,
      link: r.fields.link || null,
      category: r.fields.category || '',
      max_qty: r.fields.max_qty || 1,
      current_qty: r.fields.current_qty || 0,
      urgency: r.fields.urgency || '',
      is_completed: !!r.fields.is_completed
    }))

    return {
      props: {
        supportNeeds,
        productNeeds
      },
      revalidate: 60
    }
  } catch (error) {
    console.error('Airtable fetch failed:', error)
    return {
      props: { supportNeeds: [], productNeeds: [] },
      revalidate: 1
    }
  }
}
