import { useEffect, useRef, useMemo } from 'react'
import { useGraph, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

const MODEL_PATH = '/models/Fox.glb'

const MIN_DISTANCE = 1.0

function pickTarget(territory) {
  const angle = Math.random() * Math.PI * 2
  const dist = Math.random() * territory.radius
  return {
    x: territory.centerX + Math.cos(angle) * dist,
    z: territory.centerZ + Math.sin(angle) * dist
  }
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

export default function FoxModel({
  foxId,
  foxPositions,
  // Territory: where this fox wanders
  territory = { centerX: 0, centerZ: 0, radius: 1.5 },
  // Speeds in world units/sec
  walkSpeed = 0.8,
  runSpeed = 1.8,
  // Animation timeScales
  walkTimeScale = 1,
  runTimeScale = 1,
  surveyTimeScale = 0.5,
  // Behavior tuning
  idleRange = [2, 5],
  runChance = 0.3,
  // If true, fox just idles and never moves
  stationary = false,
  ...props
}) {
  const groupRef = useRef()
  const { scene, animations } = useGLTF(MODEL_PATH)

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, groupRef)

  // State machine refs (no re-renders needed)
  const stateRef = useRef('idle') // 'idle' | 'walking' | 'running'
  const stateTimer = useRef(0)
  const idleDuration = useRef(randomBetween(idleRange[0], idleRange[1]))
  const targetRef = useRef(pickTarget(territory))
  const currentActionName = useRef(null)
  const initialized = useRef(false)

  // Start with Survey animation on mount
  useEffect(() => {
    const action = actions['Survey']
    if (action && !initialized.current) {
      action.reset().fadeIn(0.3).play()
      action.timeScale = surveyTimeScale
      currentActionName.current = 'Survey'
      initialized.current = true
    }
  }, [actions, surveyTimeScale])

  // Switch animation with crossfade — called from useFrame
  const switchAnimation = (name, timeScale) => {
    if (currentActionName.current === name) return
    const newAction = actions[name]
    const oldAction = actions[currentActionName.current]
    if (!newAction) return

    if (oldAction && oldAction !== newAction) {
      oldAction.fadeOut(0.4)
    }
    newAction.reset().fadeIn(0.4).play()
    newAction.timeScale = timeScale
    currentActionName.current = name
  }

  useFrame((_, delta) => {
    if (!groupRef.current || !initialized.current) return

    stateTimer.current += delta
    const cur = groupRef.current.position

    if (stationary) {
      // Register position for collision even if stationary
      if (foxPositions && foxId != null) {
        foxPositions.current[foxId] = { x: cur.x, z: cur.z }
      }
      return
    }

    switch (stateRef.current) {
      case 'idle': {
        if (stateTimer.current >= idleDuration.current) {
          // Pick new target and start moving
          targetRef.current = pickTarget(territory)
          const willRun = Math.random() < runChance
          stateRef.current = willRun ? 'running' : 'walking'
          stateTimer.current = 0
          switchAnimation(
            willRun ? 'Run' : 'Walk',
            willRun ? runTimeScale : walkTimeScale
          )
        }
        break
      }
      case 'walking':
      case 'running': {
        const target = targetRef.current
        const dx = target.x - cur.x
        const dz = target.z - cur.z
        const dist = Math.sqrt(dx * dx + dz * dz)

        const spd = stateRef.current === 'running' ? runSpeed : walkSpeed

        if (dist < 0.15) {
          // Arrived — idle
          stateRef.current = 'idle'
          stateTimer.current = 0
          idleDuration.current = randomBetween(idleRange[0], idleRange[1])
          switchAnimation('Survey', surveyTimeScale)
        } else {
          const move = Math.min(dist, spd * delta)
          let newX = cur.x + (dx / dist) * move
          let newZ = cur.z + (dz / dist) * move

          // Collision avoidance
          if (foxPositions && foxId != null) {
            const others = foxPositions.current
            for (const id in others) {
              if (Number(id) === foxId) continue
              const other = others[id]
              const cdx = newX - other.x
              const cdz = newZ - other.z
              const cdist = Math.sqrt(cdx * cdx + cdz * cdz)
              if (cdist < MIN_DISTANCE && cdist > 0.001) {
                const overlap = (MIN_DISTANCE - cdist) * 0.6
                newX += (cdx / cdist) * overlap
                newZ += (cdz / cdist) * overlap
              }
            }
          }

          cur.x = newX
          cur.z = newZ

          // Smooth rotation toward movement direction
          const angle = Math.atan2(dx, dz)
          const curRot = groupRef.current.rotation.y
          let diff = angle - curRot
          while (diff > Math.PI) diff -= Math.PI * 2
          while (diff < -Math.PI) diff += Math.PI * 2
          groupRef.current.rotation.y = curRot + diff * Math.min(1, 6 * delta)
        }
        break
      }
    }

    // Register position
    if (foxPositions && foxId != null) {
      foxPositions.current[foxId] = { x: cur.x, z: cur.z }
    }
  })

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group>
        <primitive object={nodes._rootJoint} />
        <skinnedMesh
          geometry={nodes.fox.geometry}
          material={materials.fox_material}
          skeleton={nodes.fox.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload(MODEL_PATH)
