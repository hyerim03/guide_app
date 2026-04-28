import Svg, { Rect, Path, Line, Defs, ClipPath } from 'react-native-svg';

const DROP_PATH =
  'M50 10 C50 10 85 60 85 90 C85 115 70 130 50 130 C30 130 15 115 15 90 C15 60 50 10 50 10';

const WaterLevelVisual = ({ fillPct, accentColor }) => {
  const fillH = Math.max(fillPct * 100, 0.01);
  const fillY = 130 - fillH;

  return (
    <Svg width={100} height={140} viewBox="0 0 100 140">
      <Defs>
        <ClipPath id="dropClip">
          <Path d={DROP_PATH} />
        </ClipPath>
      </Defs>
      <Path d={DROP_PATH} fill="#e0f2fe" stroke="#0ea5e9" strokeWidth={2} />
      <Rect
        x={15}
        y={fillY}
        width={70}
        height={fillH}
        fill={accentColor}
        clipPath="url(#dropClip)"
      />
      <Line x1={88} y1={50} x2={95} y2={50} stroke="#f97316" strokeWidth={2} />
      <Line x1={88} y1={70} x2={95} y2={70} stroke="#f97316" strokeWidth={2} />
      <Line x1={88} y1={90} x2={95} y2={90} stroke="#f97316" strokeWidth={2} />
      <Line
        x1={88}
        y1={110}
        x2={95}
        y2={110}
        stroke="#f97316"
        strokeWidth={2}
      />
    </Svg>
  );
};

export default WaterLevelVisual;
