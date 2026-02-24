import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Grid } from '@react-three/drei'

function DataParticles({ count = 60 }) {
  const ref = useRef()
  const speeds = useMemo(
    () => Array.from({ length: count }, () => 0.003 + Math.random() * 0.008),
    [count]
  )
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = Math.random() * 5
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [count])

  useFrame(() => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i]
      if (pos[i * 3 + 1] > 5) pos[i * 3 + 1] = 0
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#d2b93c"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

export default function OsintScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 3, 6], fov: 50 }}
      frameloop="always"
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight color="#d2b93c" intensity={0.1} />
      <Grid
        position={[0, -0.5, 0]}
        args={[20, 20]}
        cellSize={0.8}
        cellThickness={0.3}
        cellColor="#2a2e35"
        sectionSize={4}
        sectionThickness={0.8}
        sectionColor="#4a5561"
        fadeDistance={12}
        fadeStrength={1}
        infiniteGrid
      />
      <DataParticles />
    </Canvas>
  )
}
