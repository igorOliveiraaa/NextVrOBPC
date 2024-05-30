import { useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { TextureLoader } from 'three';
import Head from 'next/head';

const VRViewer = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const texture = isClient ? useLoader(TextureLoader, '/static_assets/360.png') : null;

  return (
    <>
      <Head>
        <style>
          {`
            body, html {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }
            #vr-container {
              width: 100%;
              height: 100%;
              position: fixed;
              top: 0;
              left: 0;
            }
            canvas {
              display: block;
              width: 100%;
              height: 100%;
            }
          `}
        </style>
      </Head>
      {isClient && (
        <div id="vr-container">
          <Canvas>
            <OrbitControls enableZoom={false} rotateSpeed={0.5} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} />
            <Sphere args={[5, 64, 64]} scale={[-1, 1, 1]}>
              <meshBasicMaterial map={texture} side={2} />
            </Sphere>
          </Canvas>
        </div>
      )}
    </>
  );
};

export default VRViewer;
