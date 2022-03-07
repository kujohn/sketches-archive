import * as THREE from 'three'
import './gltf-loader.js'

let renderer
let camera
let scene

let width = window.innerWidth - 40
let height = window.innerHeight - 40

const app = document.getElementById('app')

const init = () => {
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
  scene = new THREE.Scene()
  camera.position.z = 100

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)

  app.innerHTML = ''
  app.appendChild(renderer.domElement)

  const loader = new THREE.GLTFLoader()
  loader.load(
    './test.glb',
    gltf => {
      scene.add(gltf.scene)
    }
  )
  renderer.render(scene, camera)
}

const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

init()
// animate()
