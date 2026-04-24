import Svg, { Rect, Circle } from 'react-native-svg';

const ThermometerVisual = ({ fillPct, accentColor }) => {
  const clampedPct = Math.min(1, Math.max(0, fillPct));
  const mercuryY = 110 - clampedPct * 84;
  const mercuryH = Math.max(clampedPct * 84 + 30, 0.01);

  return (
    <Svg width={80} height={160} viewBox="0 0 80 160">
      <Rect
        x={25}
        y={10}
        width={30}
        height={100}
        rx={15}
        fill="#e5e7eb"
        stroke="#d1d5db"
        strokeWidth={2}
      />
      <Rect
        x={30}
        y={mercuryY}
        width={20}
        height={mercuryH}
        rx={10}
        fill={accentColor}
      />
      <Circle cx={40} cy={130} r={25} fill={accentColor} />
      {[0, 1, 2, 3, 4].map(i => (
        <Rect
          key={i}
          x={55}
          y={20 + i * 20}
          width={10}
          height={3}
          fill="#6b7280"
        />
      ))}
    </Svg>
  );
};

export default ThermometerVisual;
