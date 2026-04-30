import type { CameraState } from '../../types/scene';
import { zones } from '../../data/zones';
import { TextClearing } from './TextClearing';

interface ZoneManagerProps {
  camera: CameraState;
}

export function ZoneManager({ camera }: ZoneManagerProps) {
  const textZones = zones.filter((z) => z.type === 'text');

  return (
    <>
      {textZones.map((zone) => (
        <TextClearing key={zone.id} zone={zone} camera={camera} />
      ))}
    </>
  );
}
