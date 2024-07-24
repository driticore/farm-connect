"use client";

import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMotionValue, useSpring } from 'framer-motion';
import { Environment } from '@react-three/drei';
import Model from './Model'; // Assuming Model is exported as default from './Model'

const Index: React.FC = () => {
  // Motion values for mouse coordinates
  const mouse = {

    x: useMotionValue(0),

    y: useMotionValue(0)

  }



  const smoothMouse = {

    x: useSpring(mouse.x, {stiffness: 100, damping: 100, mass: 10}),

    y: useSpring(mouse.y, {stiffness: 100, damping: 100, mass: 10})

  }



  const manageMouse = (e: { clientX: any; clientY: any; }) => {

    const { innerWidth, innerHeight } = window;

    const { clientX, clientY } = e;

    const x = clientX / innerWidth

    const y = clientY / innerHeight

    mouse.x.set(x);

    mouse.y.set(y);

  }



  useEffect( () => {

    window.addEventListener("mousemove", manageMouse)

    return () => window.removeEventListener("mousemove", manageMouse)

  }, [])

  return (
    <Canvas className='background-canvas' orthographic camera={{ position: [8.40043, -4, 5.59831], zoom: 200,}}>
      <Model {...smoothMouse} />
      <Environment preset='studio' />
      {/* Other Models & Environment components can go here */}
    </Canvas>
  );
};

export default Index;
