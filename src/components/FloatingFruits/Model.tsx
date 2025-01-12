import React from 'react';
import { Float, useGLTF } from '@react-three/drei';

import { useTransform } from 'framer-motion';

import { motion } from 'framer-motion-3d';

interface ModelProps {}

export const Model: React.FC<ModelProps> = ({...mouse}) => {
  const { nodes } = useGLTF('/medias/untitled.glb');

  return (
    <Float rotationIntensity={0.05}>
      <group>
        {nodes && (
          <>
            {nodes.Steak_2 && <Mesh node={nodes.Steak_2} multiplier={0.1} mouse={mouse} />}
            {nodes.poct_cheese_body && <Mesh node={nodes.poct_cheese_body} multiplier={0} mouse={mouse} />}
            {nodes.lime && <Mesh node={nodes.lime} multiplier={0.1} mouse={mouse} />}
            {nodes.half_lime && <Mesh node={nodes.half_lime} multiplier={0.2} mouse={mouse} />}
            {nodes.lime_cut && <Mesh node={nodes.lime_cut} multiplier={0.2} mouse={mouse} />}
            {nodes.Apricot_02_hi_poly && <Mesh node={nodes.Apricot_02_hi_poly} multiplier={.5} mouse={mouse} />}
            {/* Add more <Mesh /> components for other nodes */}
          </>
        )}
      </group>
    </Float>
    
  );
};

interface MeshProps {
  node: any; // Adjust type based on actual node types
  multiplier: any;
  mouse: any
}

const Mesh: React.FC<MeshProps> = ({ node , multiplier, mouse})  => {
  if (!node || !(node)) return null; // Ensure node is valid and of type THREE.Mesh

  const { castShadow, receiveShadow, geometry, material, position, rotation, scale } = node;
  const a = multiplier / 2;

  const rotationX = useTransform(mouse.x, [0,1], [rotation.x - a, rotation.x + a]);

  const rotationY = useTransform(mouse.y, [0,1], [rotation.y - a, rotation.y + a]);

  const positionX = useTransform(mouse.x, [0,1], [position.x - multiplier * 1, position.x + multiplier * 1]);

  const positionY = useTransform(mouse.y, [0,1], [position.y + multiplier * 1, position.y - multiplier * 1])
  return (
    <motion.mesh
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      geometry={geometry}
      material={material} // Use singular 'material' instead of 'materials'
      position={position}
      rotation={rotation}
      rotation-y={rotationX}

      rotation-x={rotationY}

      position-x={positionX}

      position-y={positionY}
      scale={scale}

    />
  );
};

useGLTF.preload('/untitled.glb');

export default Model;
