import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Grid, Stars } from '@react-three/drei'
import FoxModel from './fox-model'

function Scene({ isOpen, isNight }) {
  const loading = isOpen === null
  const foxPositions = useRef({})

  return (
    <>
      {/* Ambient light */}
      <ambientLight
        color={isNight ? '#6670aa' : '#fff5e6'}
        intensity={isNight ? 0.8 : 0.6}
      />

      {/* Directional light */}
      <directionalLight
        color={isNight ? '#8899cc' : '#ffd700'}
        intensity={isNight ? 0.8 : 1.2}
        position={[5, 5, 5]}
      />

      {/* Night point light glow */}
      {isNight && (
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
        cellColor={isNight ? '#1a3a5c' : '#2d8a56'}
        sectionSize={2}
        sectionThickness={1}
        sectionColor={isNight ? '#0ea5e9' : '#1a6b3c'}
        fadeDistance={10}
        fadeStrength={1}
        infiniteGrid
      />

      {/* Stars for night */}
      {isNight && (
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
        opacity={isNight ? 0.3 : 0.5}
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
          // Night: 7 sleepy foxes — slower, longer idles, rarely run
          <>
            {/* Adult — left side, sleepy patrol */}
            <FoxModel
              foxId={0}
              foxPositions={foxPositions}
              territory={{ centerX: -1.5, centerZ: 0.3, radius: 1 }}
              walkSpeed={0.4}
              runSpeed={0.7}
              walkTimeScale={0.5}
              runTimeScale={0.6}
              surveyTimeScale={0.15}
              idleRange={[5, 10]}
              runChance={0.1}
              scale={0.02}
              position={[-1.5, 0, 0.3]}
            />
            {/* Teen — right side, drowsy wanderer */}
            <FoxModel
              foxId={1}
              foxPositions={foxPositions}
              territory={{ centerX: 1.3, centerZ: 0, radius: 0.8 }}
              walkSpeed={0.35}
              runSpeed={0.6}
              walkTimeScale={0.4}
              runTimeScale={0.5}
              surveyTimeScale={0.2}
              idleRange={[4, 8]}
              runChance={0.05}
              scale={0.016}
              position={[1.3, 0, 0]}
            />
            {/* Adult — center-front, sleepy lookout */}
            <FoxModel
              foxId={2}
              foxPositions={foxPositions}
              stationary
              surveyTimeScale={0.12}
              scale={0.02}
              position={[0, 0, 1.2]}
              rotation={[0, -0.3, 0]}
            />
            {/* Kid — near left adult, mostly rests */}
            <FoxModel
              foxId={3}
              foxPositions={foxPositions}
              territory={{ centerX: -0.8, centerZ: 1, radius: 0.5 }}
              walkSpeed={0.3}
              runSpeed={0.5}
              walkTimeScale={0.4}
              runTimeScale={0.5}
              surveyTimeScale={0.1}
              idleRange={[6, 12]}
              runChance={0.05}
              scale={0.013}
              position={[-0.8, 0, 1]}
            />
            {/* Kid — right-back, barely awake */}
            <FoxModel
              foxId={4}
              foxPositions={foxPositions}
              territory={{ centerX: 0.6, centerZ: -0.8, radius: 0.5 }}
              walkSpeed={0.25}
              runSpeed={0.4}
              walkTimeScale={0.35}
              runTimeScale={0.4}
              surveyTimeScale={0.1}
              idleRange={[7, 14]}
              runChance={0}
              scale={0.012}
              position={[0.6, 0, -0.8]}
            />
            {/* Teen — back-left, slow drifter */}
            <FoxModel
              foxId={5}
              foxPositions={foxPositions}
              territory={{ centerX: -1.2, centerZ: -0.8, radius: 0.7 }}
              walkSpeed={0.3}
              runSpeed={0.5}
              walkTimeScale={0.4}
              runTimeScale={0.5}
              surveyTimeScale={0.15}
              idleRange={[5, 9]}
              runChance={0.05}
              scale={0.015}
              position={[-1.2, 0, -0.8]}
            />
            {/* Baby — near center-right, tiny sleepyhead */}
            <FoxModel
              foxId={6}
              foxPositions={foxPositions}
              territory={{ centerX: 0.5, centerZ: 0.8, radius: 0.4 }}
              walkSpeed={0.2}
              runSpeed={0.35}
              walkTimeScale={0.3}
              runTimeScale={0.4}
              surveyTimeScale={0.08}
              idleRange={[8, 16]}
              runChance={0}
              scale={0.011}
              position={[0.5, 0, 0.8]}
            />
          </>
        ) : (
          // Day: 7 lively foxes — varied speeds and personalities
          <>
            {/* Adult — left territory, active explorer */}
            <FoxModel
              foxId={0}
              foxPositions={foxPositions}
              territory={{ centerX: -1.5, centerZ: 0.3, radius: 1.5 }}
              walkSpeed={0.9}
              runSpeed={2.0}
              walkTimeScale={1}
              runTimeScale={1}
              surveyTimeScale={0.5}
              idleRange={[2, 4]}
              runChance={0.4}
              scale={0.02}
              position={[-1.5, 0, 0.3]}
            />
            {/* Teen — right territory, energetic runner */}
            <FoxModel
              foxId={1}
              foxPositions={foxPositions}
              territory={{ centerX: 1.3, centerZ: 0, radius: 1.2 }}
              walkSpeed={1.0}
              runSpeed={2.2}
              walkTimeScale={1.1}
              runTimeScale={1.2}
              surveyTimeScale={0.6}
              idleRange={[1.5, 3]}
              runChance={0.5}
              scale={0.016}
              position={[1.3, 0, 0]}
            />
            {/* Adult — center-back, casual stroller */}
            <FoxModel
              foxId={2}
              foxPositions={foxPositions}
              territory={{ centerX: 0, centerZ: -0.5, radius: 1.3 }}
              walkSpeed={0.7}
              runSpeed={1.5}
              walkTimeScale={0.8}
              runTimeScale={0.9}
              surveyTimeScale={0.4}
              idleRange={[3, 6]}
              runChance={0.2}
              scale={0.02}
              position={[0, 0, -0.5]}
            />
            {/* Kid — front-left, hyperactive */}
            <FoxModel
              foxId={3}
              foxPositions={foxPositions}
              territory={{ centerX: -0.5, centerZ: 1.2, radius: 0.8 }}
              walkSpeed={0.8}
              runSpeed={2.0}
              walkTimeScale={1.2}
              runTimeScale={1.4}
              surveyTimeScale={0.5}
              idleRange={[1, 2.5]}
              runChance={0.6}
              scale={0.013}
              position={[-0.5, 0, 1.2]}
            />
            {/* Kid — right-front, curious */}
            <FoxModel
              foxId={4}
              foxPositions={foxPositions}
              territory={{ centerX: 0.8, centerZ: 1, radius: 0.7 }}
              walkSpeed={0.6}
              runSpeed={1.2}
              walkTimeScale={0.9}
              runTimeScale={1}
              surveyTimeScale={0.4}
              idleRange={[2, 5]}
              runChance={0.3}
              scale={0.012}
              position={[0.8, 0, 1]}
            />
            {/* Teen — back-left, adventurous scout */}
            <FoxModel
              foxId={5}
              foxPositions={foxPositions}
              territory={{ centerX: -1.2, centerZ: -0.8, radius: 1 }}
              walkSpeed={0.85}
              runSpeed={1.8}
              walkTimeScale={1}
              runTimeScale={1.1}
              surveyTimeScale={0.5}
              idleRange={[1.5, 3.5]}
              runChance={0.45}
              scale={0.015}
              position={[-1.2, 0, -0.8]}
            />
            {/* Baby — near center, tiny and curious */}
            <FoxModel
              foxId={6}
              foxPositions={foxPositions}
              territory={{ centerX: 0.3, centerZ: 0.5, radius: 0.5 }}
              walkSpeed={0.5}
              runSpeed={1.0}
              walkTimeScale={1}
              runTimeScale={1.2}
              surveyTimeScale={0.4}
              idleRange={[1, 3]}
              runChance={0.4}
              scale={0.011}
              position={[0.3, 0, 0.5]}
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
