import { useEffect, useRef, useState } from 'react'
import { Box, Flex, Grid, Text } from 'theme-ui'
import { keyframes } from '@emotion/react'
import Buttons from './button'
import CardModel from './card-model'
import { useTranslation } from '../../../lib/i18n'

/** @jsxImportSource theme-ui */

const REPO_URL = 'https://github.com/HappyHackingSpace/vt'
const TEMPLATES_REPO_URL = 'https://github.com/HappyHackingSpace/vt-templates'
const STATS_URL =
  'https://raw.githubusercontent.com/HappyHackingSpace/vt-templates/main/.assets/stats.json'
const DANGER = '#ff3355'
const DANGER_RGB = [255, 51, 85]
const MATRIX_DIM_RGB = [64, 64, 64]

// Fallbacks used until stats.json loads
const DEFAULT_STATS = [
  { value: 123, label: 'TARGETS' },
  { value: 12, label: 'CVES' },
  { value: 104, label: 'BENCHMARKS' },
  { value: 5, label: 'LABS' }
]

const DEFAULT_TAGS = ['sqli', 'xss', 'rce', 'ssrf', 'lfi', 'auth-bypass']

// Tags shown as vuln-type pills (subset of all tags)
const FEATURED_TAGS = new Set([
  'sqli', 'xss', 'rce', 'ssrf', 'lfi', 'rfi', 'ssti', 'xxe',
  'idor', 'auth-bypass', 'open-redirect', 'nosqli', 'deserialization'
])

const RETICLE_CHARS =
  'アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF'

// Ring band definitions — matching generate_social_ascii.py exactly
const RING_BANDS = [
  { inner: 0.20, outer: 0.26, bright: 220 / 255 },
  { inner: 0.44, outer: 0.50, bright: 190 / 255 },
  { inner: 0.68, outer: 0.74, bright: 150 / 255 },
  { inner: 0.90, outer: 1.00, bright: 100 / 255 }
]

const TICK_RADII = [0.23, 0.47, 0.71, 0.95]

const pillPop = keyframes`
  0% { opacity: 0; transform: translateY(6px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`

// Deterministic PRNG (mulberry32)
function createRng(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Compute reticle mask value (0–1) at a given point — ported from Python
function reticleMask(px, py, cx, cy, r) {
  const dx = px - cx
  const dy = py - cy
  const dist = Math.sqrt(dx * dx + dy * dy)
  const nd = dist / r

  // Ring bands
  for (const band of RING_BANDS) {
    if (nd >= band.inner && nd <= band.outer) return band.bright
  }

  // Bullseye hot spot
  if (nd < 0.08) return 1.0

  // Crosshair lines (with center gap at 0.10r)
  const anx = Math.abs(dx) / r
  const any = Math.abs(dy) / r
  if (any < 0.02 && anx > 0.10 && anx < 1.05) return 110 / 255
  if (anx < 0.02 && any > 0.10 && any < 1.05) return 110 / 255

  // Tick marks — every 10° around each ring, skip cardinal directions
  const angle = Math.atan2(dy, dx)
  for (const tr of TICK_RADII) {
    if (Math.abs(nd - tr) < 0.045) {
      for (let t = 0; t < 36; t++) {
        if (t % 9 === 0) continue
        const ta = (t / 36) * Math.PI * 2
        let ad = Math.abs(angle - ta)
        if (ad > Math.PI) ad = Math.PI * 2 - ad
        if (ad < 0.06) return 80 / 255
      }
    }
  }

  // Corner brackets at ±1.08r
  const bo = 1.08
  const bl = 0.12
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      const bx = sx * bo
      const by = sy * bo
      const nx = dx / r
      const ny = dy / r
      // Horizontal arm
      if (
        Math.abs(ny - by) < 0.025 &&
        nx * sx <= bx * sx &&
        nx * sx >= (bx - sx * bl) * sx
      )
        return 90 / 255
      // Vertical arm
      if (
        Math.abs(nx - bx) < 0.025 &&
        ny * sy <= by * sy &&
        ny * sy >= (by - sy * bl) * sy
      )
        return 90 / 255
    }
  }

  // Diagonal notches at 45° on outer ring
  if (nd > 0.94 && nd < 1.06) {
    for (const da of [Math.PI / 4, (3 * Math.PI) / 4, (-3 * Math.PI) / 4, -Math.PI / 4]) {
      let ad = Math.abs(angle - da)
      if (ad > Math.PI) ad = Math.PI * 2 - ad
      if (ad < 0.05) return 100 / 255
    }
  }

  return 0
}

function ReticleCanvas({ size = 420 }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const pad = size * 0.12
    const cssW = size + pad * 2
    const cssH = size + pad * 2
    canvas.width = Math.round(cssW * dpr)
    canvas.height = Math.round(cssH * dpr)
    canvas.style.width = `${cssW}px`
    canvas.style.height = `${cssH}px`

    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)

    const cellW = 9
    const cellH = 13
    const cx = cssW / 2
    const cy = cssH / 2
    const r = size / 2

    // Pre-generate character grid with deterministic layout
    const rng = createRng(42)
    const cells = []

    for (let y = 0; y < cssH; y += cellH) {
      for (let x = 0; x < cssW; x += cellW) {
        const pcx = x + cellW / 2
        const pcy = y + cellH / 2
        const mask = reticleMask(pcx, pcy, cx, cy, r)
        const ch = RETICLE_CHARS[Math.floor(rng() * RETICLE_CHARS.length)]
        const phase = rng() * Math.PI * 2
        const speed = 0.5 + rng() * 2
        const showBg = rng() < 0.05

        cells.push({ x, y, ch, mask, phase, speed, showBg })
      }
    }

    // Pre-render static base layer to offscreen canvas
    const baseCanvas = document.createElement('canvas')
    baseCanvas.width = canvas.width
    baseCanvas.height = canvas.height
    const baseCtx = baseCanvas.getContext('2d')
    baseCtx.scale(dpr, dpr)
    baseCtx.font = '10px monospace'
    baseCtx.textBaseline = 'top'

    const drawRng = createRng(77)
    for (const cell of cells) {
      if (cell.mask <= 0) continue

      // Density gating — matching Python render_char_art logic
      const m = cell.mask * 255
      let alpha = 0
      if (m > 180) {
        alpha = (200 + drawRng() * 55) / 255
      } else if (m > 120) {
        if (drawRng() < 0.8) alpha = (120 + drawRng() * 90) / 255
      } else if (m > 60) {
        if (drawRng() < 0.5) alpha = (60 + drawRng() * 80) / 255
      } else if (m > 25) {
        if (drawRng() < 0.2) alpha = (25 + drawRng() * 45) / 255
      }

      if (alpha > 0) {
        const rv = Math.min(255, DANGER_RGB[0] + Math.floor((drawRng() - 0.5) * 30))
        const gv = Math.min(255, DANGER_RGB[1] + Math.floor((drawRng() - 0.5) * 12))
        baseCtx.fillStyle = `rgba(${rv}, ${gv}, ${DANGER_RGB[2]}, ${alpha})`
        baseCtx.fillText(cell.ch, cell.x, cell.y)
      }
    }

    // Animation loop — lightweight: blit base + animate glow + sparse noise
    function draw(time) {
      ctx.clearRect(0, 0, cssW, cssH)

      // Breathing pulse on the entire reticle
      const breath = 0.88 + 0.12 * Math.sin(time * 0.001)
      ctx.globalAlpha = breath
      ctx.drawImage(baseCanvas, 0, 0, cssW, cssH)
      ctx.globalAlpha = 1.0

      // Bullseye radial glow
      const ga = 0.1 + 0.08 * Math.sin(time * 0.002)
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.14)
      grad.addColorStop(0, `rgba(255, 51, 85, ${ga * 3})`)
      grad.addColorStop(0.5, `rgba(255, 51, 85, ${ga})`)
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(cx, cy, r * 0.14, 0, Math.PI * 2)
      ctx.fill()

      // Outer bloom
      const ba = 0.03 + 0.02 * Math.sin(time * 0.0008)
      const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.6)
      bloom.addColorStop(0, `rgba(255, 51, 85, ${ba})`)
      bloom.addColorStop(0.6, `rgba(255, 51, 85, ${ba * 0.3})`)
      bloom.addColorStop(1, 'transparent')
      ctx.fillStyle = bloom
      ctx.beginPath()
      ctx.arc(cx, cy, r * 0.6, 0, Math.PI * 2)
      ctx.fill()

      // Sparse background matrix noise — changes over time
      ctx.font = '10px monospace'
      ctx.textBaseline = 'top'
      const noiseRng = createRng(Math.floor(time / 250))
      for (let i = 0; i < 12; i++) {
        const nx = noiseRng() * cssW
        const ny = noiseRng() * cssH
        const nc = RETICLE_CHARS[Math.floor(noiseRng() * RETICLE_CHARS.length)]
        const na = 0.02 + noiseRng() * 0.06
        ctx.fillStyle = `rgba(${MATRIX_DIM_RGB.join(',')}, ${na})`
        ctx.fillText(nc, nx, ny)
      }

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [size])

  const cssW = size + size * 0.24
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ display: 'block', width: `${cssW}px`, height: `${cssW}px` }}
    />
  )
}

export default function VulnerableTarget({ stars }) {
  const { t } = useTranslation()
  const [repoStars, setRepoStars] = useState(stars || 0)
  const [stats, setStats] = useState(DEFAULT_STATS)
  const [vulnTags, setVulnTags] = useState(DEFAULT_TAGS)

  useEffect(() => {
    fetch('https://api.github.com/repos/HappyHackingSpace/vt')
      .then(response => response.json())
      .then(data => {
        if (data.stargazers_count != null) setRepoStars(data.stargazers_count)
      })
      .catch(error => console.error('Error fetching stars:', error))

    fetch(STATS_URL)
      .then(response => response.json())
      .then(data => {
        const { total, categories, tags } = data
        if (total != null && categories != null) {
          setStats([
            { value: total, label: t('cards.vulnerableTarget.targets') },
            { value: categories.cves || 0, label: t('cards.vulnerableTarget.cves') },
            { value: categories.benchmarks || 0, label: t('cards.vulnerableTarget.benchmarks') },
            { value: categories.labs || 0, label: t('cards.vulnerableTarget.labs') }
          ])
        }
        if (Array.isArray(tags)) {
          const featured = tags.filter(t => FEATURED_TAGS.has(t))
          if (featured.length > 0) {
            // Shuffle and pick 6
            const shuffled = [...featured].sort(() => Math.random() - 0.5)
            setVulnTags(shuffled.slice(0, 6))
          }
        }
      })
      .catch(error => console.error('Error fetching VT stats:', error))
  }, [])

  return (
    <Box sx={{ position: 'relative' }}>
      <CardModel
        github_link={REPO_URL}
        color="white"
        stars={repoStars}
        highlight={DANGER}
        position={[null, 'top', 'top']}
        sx={{
          backgroundColor: '#000',
          position: 'relative',
          overflow: 'hidden',
          minHeight: ['300px', '330px', '360px']
        }}
      >
        {/* CRT scanlines */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 3px)',
            backgroundSize: '100% 3px'
          }}
        />

        {/* Vignette */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)'
          }}
        />

        <Grid
          columns={[1, 1, '1.2fr 1fr']}
          sx={{ zIndex: 2, position: 'relative' }}
        >
          {/* Left column — text content */}
          <Flex
            sx={{
              flexDirection: 'column',
              gap: [2, 2, 3],
              py: [2, 2, 3]
            }}
          >
            <Box>
              <Text
                as="h2"
                sx={{
                  fontSize: ['48px', '56px', '64px'],
                  fontWeight: 900,
                  color: 'white',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  fontFamily: 'Phantom Sans',
                  textShadow:
                    '0 0 20px rgba(255,255,255,0.15), 0 0 40px rgba(255,255,255,0.05)'
                }}
              >
                {t('cards.vulnerableTarget.title')}
              </Text>
              <Text
                as="p"
                sx={{
                  fontSize: ['13px', '15px', '17px'],
                  color: '#c0c0c0',
                  letterSpacing: '0.12em',
                  mt: 1,
                  fontFamily: 'monospace'
                }}
              >
                {t('cards.vulnerableTarget.subtitle')}
              </Text>
            </Box>

            <Text
              as="p"
              sx={{
                fontSize: ['11px', '13px', '14px'],
                color: '#505050',
                fontFamily: 'monospace'
              }}
            >
              {t('cards.vulnerableTarget.tagline')}
            </Text>

            <Flex sx={{ gap: [3, 3, 4], flexWrap: 'wrap' }}>
              {stats.map(({ value, label }) => (
                <Box key={label}>
                  <Text
                    as="span"
                    sx={{
                      fontSize: ['22px', '26px', '32px'],
                      fontWeight: 900,
                      color: 'white',
                      display: 'block',
                      lineHeight: 1.1,
                      fontFamily: 'Phantom Sans'
                    }}
                  >
                    {value}
                  </Text>
                  <Text
                    as="span"
                    sx={{
                      fontSize: ['8px', '9px', '10px'],
                      color: '#888',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontFamily: 'monospace'
                    }}
                  >
                    {label}
                  </Text>
                </Box>
              ))}
            </Flex>

            <Flex sx={{ gap: ['4px', '5px', '6px'], flexWrap: 'wrap' }}>
              {vulnTags.map((tag, index) => (
                <Box
                  key={tag}
                  sx={{
                    px: ['6px', '8px', '10px'],
                    py: ['2px', '3px', '4px'],
                    border: '1px solid rgba(255, 51, 85, 0.7)',
                    borderRadius: 0,
                    color: DANGER,
                    fontSize: ['8px', '9px', '10px'],
                    fontFamily: 'monospace',
                    animation: `${pillPop} 0.4s ease-out both`,
                    animationDelay: `${index * 0.08}s`
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Flex>

            <Text
              as="code"
              sx={{
                fontSize: ['7px', '9px', '10px'],
                color: '#505050',
                fontFamily: 'monospace',
                whiteSpace: 'nowrap'
              }}
            >
              {t('cards.vulnerableTarget.install')}
            </Text>

            <Flex sx={{ flexDirection: 'column' }}>
              <Buttons
                id="vt-explore"
                link={REPO_URL}
                primary={DANGER}
                icon="explore"
              >
                {t('cards.vulnerableTarget.explore')}
              </Buttons>
              <Buttons
                id="vt-templates"
                link="https://vulnerabletarget.com"
                icon="docs"
              >
                {t('cards.vulnerableTarget.browse')}
              </Buttons>
            </Flex>
          </Flex>

          {/* Right column — spacer for the overflow reticle */}
          <Box />
        </Grid>
      </CardModel>

      {/* Overflowing reticle canvas — desktop only, like the Sprig console */}
      <Box
        sx={{
          position: 'absolute',
          right: ['-30%', '-25%', '-15%', '-10%'],
          top: ['10%', '5%', '3%'],
          display: ['none', 'none', 'block'],
          zIndex: 3,
          pointerEvents: 'none'
        }}
      >
        <ReticleCanvas size={380} />
      </Box>
    </Box>
  )
}
