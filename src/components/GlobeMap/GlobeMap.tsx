import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { TextureLoader, Vector3 } from "three";
import nowPinUrl from "@/assets/now-pin.svg?url";
import type { GlobeLocation } from "@/types/globe";

const EARTH_TEXTURE = "/textures/earth_day.jpg";

const RADIUS = 2;

function latLngToVec3(lat: number, lng: number, radius: number): Vector3 {
	const phi = (90 - lat) * (Math.PI / 180);
	const theta = (lng + 180) * (Math.PI / 180);
	return new Vector3(
		-(radius * Math.sin(phi) * Math.cos(theta)),
		radius * Math.cos(phi),
		radius * Math.sin(phi) * Math.sin(theta),
	);
}

function Earth() {
	const texture = useLoader(TextureLoader, EARTH_TEXTURE);
	return (
		<mesh>
			<sphereGeometry args={[RADIUS, 64, 64]} />
			<meshBasicMaterial map={texture} />
		</mesh>
	);
}

function Pin({ lat, lng }: { lat: number; lng: number }) {
	const texture = useLoader(TextureLoader, nowPinUrl);
	const pos = useMemo(() => latLngToVec3(lat, lng, RADIUS + 0.05), [lat, lng]);

	return (
		<sprite position={[pos.x, pos.y, pos.z]} scale={[0.12, 0.12, 1]}>
			<spriteMaterial map={texture} transparent depthWrite={false} />
		</sprite>
	);
}

interface GlobeMapProps {
	locations: GlobeLocation[];
}

export function GlobeMap({ locations }: GlobeMapProps) {
	return (
		<Canvas
			gl={{ alpha: true, preserveDrawingBuffer: true, powerPreference: "low-power" }}
			camera={{ position: [0, 0, 5.5], fov: 45 }}
			style={{ background: "transparent" }}
			onCreated={({ gl }) => gl.setClearAlpha(0)}
		>
			<Suspense fallback={null}>
				<Earth />
				{locations.map((loc) => (
					<Pin key={`${loc.lat},${loc.lng}`} lat={loc.lat} lng={loc.lng} />
				))}
			</Suspense>
			<OrbitControls
				autoRotate
				autoRotateSpeed={0.5}
				enableZoom={false}
				enablePan={false}
			/>
		</Canvas>
	);
}
