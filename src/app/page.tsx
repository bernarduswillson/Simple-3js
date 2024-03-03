'use client'

import React, { useRef, useEffect } from 'react';
import { NextPage } from 'next';
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  PointLight,
  AmbientLight,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  // const y1 = useTransform(scrollY, [startPixel, endPixel], [0, -300]);

  useEffect(() => {
    let scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer, cube: Mesh, light: PointLight, edges: LineSegments;

    scene = new Scene();

    camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new WebGLRenderer({ canvas: canvasRef.current! });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new BoxGeometry();
    const material = new MeshStandardMaterial({ color: 0x00ff00 });
    cube = new Mesh(geometry, material);

    const edgesGeometry = new EdgesGeometry(geometry);
    const edgesMaterial = new LineBasicMaterial({ color: 0x000000 });

    edges = new LineSegments(edgesGeometry, edgesMaterial);
    cube.add(edges);

    scene.add(cube);

    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    light = new PointLight(0xffffff, 100);
    light.position.set(5, 5, 5);
    light.castShadow = true;
    scene.add(light);

    const controls = new OrbitControls(camera, renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className='overflow-hidden h-screen'>
      <h1>SIMPLE 3JS</h1>
      <canvas ref={canvasRef} />
    </div>
  )
};

export default Home;
