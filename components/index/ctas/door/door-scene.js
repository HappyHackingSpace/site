import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Grid, Stars } from '@react-three/drei'
import FoxModel from './fox-model'

function Scene({ isOpen, isNight }) {
  const loading = isOpen === null
  const foxPositions = useRef({})
  const useDark = isNight || !isOpen

  return (
    <>
      {/* Ambient light */}
      <ambientLight
        color={useDark ? '#6670aa' : '#fff5e6'}
        intensity={useDark ? 0.8 : 0.6}
      />

      {/* Directional light */}
      <directionalLight
        color={useDark ? '#8899cc' : '#ffd700'}
        intensity={useDark ? 0.8 : 1.2}
        position={[5, 5, 5]}
      />

      {/* Dark point light glow */}
      {useDark && (
        <pointLight
          color="#33d6a6"
          intensity={1.2}
          position={[0, 2, 0]}
          distance={10}
        />
      )}

      {/* Ground grid */}
      <Grid
        position={[0, 0, 0]}
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor={useDark ? '#1a3a5c' : '#2d8a56'}
        sectionSize={2}
        sectionThickness={1}
        sectionColor={useDark ? '#0ea5e9' : '#1a6b3c'}
        fadeDistance={10}
        fadeStrength={1}
        infiniteGrid
      />

      {/* Stars for dark state */}
      {useDark && (
        <Stars
          radius={50}
          depth={50}
          count={300}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />
      )}


      {/* Contact shadows */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={useDark ? 0.3 : 0.5}
        scale={10}
        blur={2}
        far={4}
      />

      {/* Fox instances */}
      {loading ? (
        <FoxModel
          stationary
          surveyTimeScale={0.2}
          scale={0.02}
          position={[0, 0, 0]}
          rotation={[0, -0.3, 0]}
        />
      ) : isOpen ? (
        isNight ? (
          // Night: 7 sleepy foxes — spread out, slower
          <>
            {/* Adult — far left */}
            <FoxModel
              foxId={0}
              foxPositions={foxPositions}
              territory={{ centerX: -3, centerZ: 2, radius: 1.2 }}
              walkSpeed={0.4}
              runSpeed={0.7}
              walkTimeScale={0.5}
              runTimeScale={0.6}
              surveyTimeScale={0.15}
              idleRange={[5, 10]}
              runChance={0.1}
              scale={0.02}
              position={[-3, 0, 2]}
            />
            {/* Teen — far right */}
            <FoxModel
              foxId={1}
              foxPositions={foxPositions}
              territory={{ centerX: 3, centerZ: 1, radius: 1 }}
              walkSpeed={0.35}
              runSpeed={0.6}
              walkTimeScale={0.4}
              runTimeScale={0.5}
              surveyTimeScale={0.2}
              idleRange={[4, 8]}
              runChance={0.05}
              scale={0.016}
              position={[3, 0, 1]}
            />
            {/* Adult — center-front, sleepy lookout */}
            <FoxModel
              foxId={2}
              foxPositions={foxPositions}
              stationary
              surveyTimeScale={0.12}
              scale={0.02}
              position={[0, 0, 3]}
              rotation={[0, -0.3, 0]}
            />
            {/* Kid — front-left, near status */}
            <FoxModel
              foxId={3}
              foxPositions={foxPositions}
              territory={{ centerX: -1.5, centerZ: 4, radius: 0.8 }}
              walkSpeed={0.3}
              runSpeed={0.5}
              walkTimeScale={0.4}
              runTimeScale={0.5}
              surveyTimeScale={0.1}
              idleRange={[6, 12]}
              runChance={0.05}
              scale={0.013}
              position={[-1.5, 0, 4]}
            />
            {/* Kid — back-right */}
            <FoxModel
              foxId={4}
              foxPositions={foxPositions}
              territory={{ centerX: 1.5, centerZ: -1, radius: 0.8 }}
              walkSpeed={0.25}
              runSpeed={0.4}
              walkTimeScale={0.35}
              runTimeScale={0.4}
              surveyTimeScale={0.1}
              idleRange={[7, 14]}
              runChance={0}
              scale={0.012}
              position={[1.5, 0, -1]}
            />
            {/* Teen — back-left */}
            <FoxModel
              foxId={5}
              foxPositions={foxPositions}
              territory={{ centerX: -2, centerZ: -1, radius: 0.8 }}
              walkSpeed={0.3}
              runSpeed={0.5}
              walkTimeScale={0.4}
              runTimeScale={0.5}
              surveyTimeScale={0.15}
              idleRange={[5, 9]}
              runChance={0.05}
              scale={0.015}
              position={[-2, 0, -1]}
            />
            {/* Baby — front-right, near status */}
            <FoxModel
              foxId={6}
              foxPositions={foxPositions}
              territory={{ centerX: 1, centerZ: 5, radius: 0.6 }}
              walkSpeed={0.2}
              runSpeed={0.35}
              walkTimeScale={0.3}
              runTimeScale={0.4}
              surveyTimeScale={0.08}
              idleRange={[8, 16]}
              runChance={0}
              scale={0.011}
              position={[1, 0, 5]}
            />
          </>
        ) : (
          // Day: 7 lively foxes — well spread, some near camera
          <>
            {/* Adult — far left */}
            <FoxModel
              foxId={0}
              foxPositions={foxPositions}
              territory={{ centerX: -3, centerZ: 2, radius: 1.5 }}
              walkSpeed={0.9}
              runSpeed={2.0}
              walkTimeScale={1}
              runTimeScale={1}
              surveyTimeScale={0.5}
              idleRange={[2, 4]}
              runChance={0.4}
              scale={0.02}
              position={[-3, 0, 2]}
            />
            {/* Teen — far right */}
            <FoxModel
              foxId={1}
              foxPositions={foxPositions}
              territory={{ centerX: 3, centerZ: 1, radius: 1.5 }}
              walkSpeed={1.0}
              runSpeed={2.2}
              walkTimeScale={1.1}
              runTimeScale={1.2}
              surveyTimeScale={0.6}
              idleRange={[1.5, 3]}
              runChance={0.5}
              scale={0.016}
              position={[3, 0, 1]}
            />
            {/* Adult — center-back */}
            <FoxModel
              foxId={2}
              foxPositions={foxPositions}
              territory={{ centerX: 0, centerZ: -2, radius: 1.5 }}
              walkSpeed={0.7}
              runSpeed={1.5}
              walkTimeScale={0.8}
              runTimeScale={0.9}
              surveyTimeScale={0.4}
              idleRange={[3, 6]}
              runChance={0.2}
              scale={0.02}
              position={[0, 0, -2]}
            />
            {/* Kid — front-left, near status */}
            <FoxModel
              foxId={3}
              foxPositions={foxPositions}
              territory={{ centerX: -1.5, centerZ: 4, radius: 1 }}
              walkSpeed={0.8}
              runSpeed={2.0}
              walkTimeScale={1.2}
              runTimeScale={1.4}
              surveyTimeScale={0.5}
              idleRange={[1, 2.5]}
              runChance={0.6}
              scale={0.013}
              position={[-1.5, 0, 4]}
            />
            {/* Kid — front-right, near status */}
            <FoxModel
              foxId={4}
              foxPositions={foxPositions}
              territory={{ centerX: 1.5, centerZ: 4, radius: 1 }}
              walkSpeed={0.6}
              runSpeed={1.2}
              walkTimeScale={0.9}
              runTimeScale={1}
              surveyTimeScale={0.4}
              idleRange={[2, 5]}
              runChance={0.3}
              scale={0.012}
              position={[1.5, 0, 4]}
            />
            {/* Teen — back-left */}
            <FoxModel
              foxId={5}
              foxPositions={foxPositions}
              territory={{ centerX: -2, centerZ: -1, radius: 1.2 }}
              walkSpeed={0.85}
              runSpeed={1.8}
              walkTimeScale={1}
              runTimeScale={1.1}
              surveyTimeScale={0.5}
              idleRange={[1.5, 3.5]}
              runChance={0.45}
              scale={0.015}
              position={[-2, 0, -1]}
            />
            {/* Baby — center-front, closest to camera */}
            <FoxModel
              foxId={6}
              foxPositions={foxPositions}
              territory={{ centerX: 0.5, centerZ: 5, radius: 1 }}
              walkSpeed={0.5}
              runSpeed={1.0}
              walkTimeScale={1}
              runTimeScale={1.2}
              surveyTimeScale={0.4}
              idleRange={[1, 3]}
              runChance={0.4}
              scale={0.011}
              position={[0.5, 0, 5]}
            />
          </>
        )
      ) : (
        <FoxModel
          stationary
          surveyTimeScale={0.3}
          scale={0.02}
          position={[0, 0, 0]}
          rotation={[0, -0.3, 0]}
        />
      )}
    </>
  )
}

export default function DoorScene({ isOpen, isNight }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 3, 7], fov: 55 }}
      frameloop="always"
      style={{ position: 'absolute', inset: 0 }}
    >
      <Scene isOpen={isOpen} isNight={isNight} />
    </Canvas>
  )
}
