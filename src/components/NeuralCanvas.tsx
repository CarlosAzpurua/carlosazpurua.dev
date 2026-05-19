import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

interface NeuralNode {
  position: THREE.Vector3
  velocity: THREE.Vector3
  originalY: number
  phase: number
}

const NODE_COUNT = 90
const CONNECTION_DISTANCE = 2.2
const MOUSE_REPEL_RADIUS = 2.5
const MOUSE_FORCE = 0.8

export default function NeuralCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, nx: 0, ny: 0 })
  const frameRef = useRef<number>(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const w = window.innerWidth
    const h = window.innerHeight
    mouseRef.current.nx = (e.clientX / w) * 2 - 1
    mouseRef.current.ny = -(e.clientY / h) * 2 + 1
  }, [])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── Renderer ──────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Scene & Camera ────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 10)

    // ── Nodes ─────────────────────────────────────────────
    const nodes: NeuralNode[] = Array.from({ length: NODE_COUNT }, () => {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 4
      )
      return {
        position: pos.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.006,
          0
        ),
        originalY: pos.y,
        phase: Math.random() * Math.PI * 2,
      }
    })

    // ── Node Geometry (points) ────────────────────────────
    const pointGeo = new THREE.BufferGeometry()
    const pointPositions = new Float32Array(NODE_COUNT * 3)
    const pointColors = new Float32Array(NODE_COUNT * 3)

    nodes.forEach((n, i) => {
      pointPositions[i * 3]     = n.position.x
      pointPositions[i * 3 + 1] = n.position.y
      pointPositions[i * 3 + 2] = n.position.z

      // Alternate violet / cyan / pink
      const r = Math.random()
      if (r < 0.5) {
        pointColors[i * 3] = 0.48; pointColors[i * 3 + 1] = 0.43; pointColors[i * 3 + 2] = 1.0  // violet
      } else if (r < 0.8) {
        pointColors[i * 3] = 0.0;  pointColors[i * 3 + 1] = 0.83; pointColors[i * 3 + 2] = 1.0  // cyan
      } else {
        pointColors[i * 3] = 1.0;  pointColors[i * 3 + 1] = 0.30; pointColors[i * 3 + 2] = 0.55 // pink
      }
    })

    pointGeo.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3))
    pointGeo.setAttribute('color', new THREE.BufferAttribute(pointColors, 3))

    const pointMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(pointGeo, pointMat)
    scene.add(points)

    // ── Connections (lines) ───────────────────────────────
    const maxConnections = NODE_COUNT * 8
    const linePositions = new Float32Array(maxConnections * 6)
    const lineColors    = new Float32Array(maxConnections * 6)

    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    lineGeo.setAttribute('color',    new THREE.BufferAttribute(lineColors, 3))

    const lineMat = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.35 })
    )
    scene.add(lineMat)

    // ── Pulse rings ───────────────────────────────────────
    const rings: { mesh: THREE.Mesh; birth: number; node: number }[] = []
    const ringInterval = setInterval(() => {
      if (rings.length > 6) return
      const idx = Math.floor(Math.random() * NODE_COUNT)
      const geo = new THREE.RingGeometry(0.05, 0.08, 32)
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x7B6FFF),
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.copy(nodes[idx].position)
      scene.add(mesh)
      rings.push({ mesh, birth: performance.now(), node: idx })
    }, 600)

    // ── Animation loop ────────────────────────────────────
    const clock = new THREE.Clock()
    let lineCount = 0

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Mouse world position
      const mx = mouseRef.current.nx * 8
      const my = mouseRef.current.ny * 5

      // Update nodes
      nodes.forEach((n, i) => {
        // Float
        n.position.y = n.originalY + Math.sin(t * 0.4 + n.phase) * 0.25

        // Move
        n.position.x += n.velocity.x
        n.position.y += n.velocity.y

        // Wrap
        if (n.position.x > 8) n.velocity.x *= -1
        if (n.position.x < -8) n.velocity.x *= -1
        if (n.position.y > 5.5) n.velocity.y *= -1
        if (n.position.y < -5.5) n.velocity.y *= -1

        // Mouse repel
        const dx = n.position.x - mx
        const dy = n.position.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_REPEL_RADIUS && dist > 0.01) {
          const force = (MOUSE_REPEL_RADIUS - dist) / MOUSE_REPEL_RADIUS * MOUSE_FORCE
          n.position.x += (dx / dist) * force * 0.04
          n.position.y += (dy / dist) * force * 0.04
        }

        // Update buffer
        pointPositions[i * 3]     = n.position.x
        pointPositions[i * 3 + 1] = n.position.y
        pointPositions[i * 3 + 2] = n.position.z
      })

      pointGeo.attributes.position.needsUpdate = true

      // Build connections
      lineCount = 0
      for (let i = 0; i < NODE_COUNT && lineCount < maxConnections; i++) {
        for (let j = i + 1; j < NODE_COUNT && lineCount < maxConnections; j++) {
          const dx = nodes[i].position.x - nodes[j].position.x
          const dy = nodes[i].position.y - nodes[j].position.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < CONNECTION_DISTANCE) {
            const alpha = 1 - d / CONNECTION_DISTANCE
            const base = lineCount * 6
            linePositions[base]     = nodes[i].position.x
            linePositions[base + 1] = nodes[i].position.y
            linePositions[base + 2] = nodes[i].position.z
            linePositions[base + 3] = nodes[j].position.x
            linePositions[base + 4] = nodes[j].position.y
            linePositions[base + 5] = nodes[j].position.z
            // Violet to cyan gradient along distance
            const vc = [0.48 * alpha, 0.43 * alpha, 1.0 * alpha]
            const cc = [0.0 * alpha, 0.83 * alpha, 1.0 * alpha]
            const blend = d / CONNECTION_DISTANCE
            lineColors[base]     = vc[0] * (1-blend) + cc[0] * blend
            lineColors[base + 1] = vc[1] * (1-blend) + cc[1] * blend
            lineColors[base + 2] = vc[2] * (1-blend) + cc[2] * blend
            lineColors[base + 3] = lineColors[base]
            lineColors[base + 4] = lineColors[base + 1]
            lineColors[base + 5] = lineColors[base + 2]
            lineCount++
          }
        }
      }

      lineGeo.setDrawRange(0, lineCount * 2)
      lineGeo.attributes.position.needsUpdate = true
      lineGeo.attributes.color.needsUpdate = true

      // Pulse rings
      const now = performance.now()
      for (let r = rings.length - 1; r >= 0; r--) {
        const ring = rings[r]
        const age = (now - ring.birth) / 1000
        if (age > 1.5) {
          scene.remove(ring.mesh)
          ring.mesh.geometry.dispose()
          ;(ring.mesh.material as THREE.MeshBasicMaterial).dispose()
          rings.splice(r, 1)
          continue
        }
        const s = 1 + age * 3
        ring.mesh.scale.set(s, s, s)
        ;(ring.mesh.material as THREE.MeshBasicMaterial).opacity = 0.6 * (1 - age / 1.5)
        ring.mesh.position.copy(nodes[ring.node].position)
      }

      renderer.render(scene, camera)
    }

    animate()

    // ── Resize ────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(frameRef.current)
      clearInterval(ringInterval)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', handleMouseMove)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [handleMouseMove])

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  )
}
