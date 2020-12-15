import React, { FC } from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { HEADER_BAR_HEIGHT } from '../../../constants/layout';

export const SvgHeaderSearchIcon: FC = () => {
  return (
    <Svg width={HEADER_BAR_HEIGHT / 2} height={HEADER_BAR_HEIGHT / 2} viewBox="0 0 20.414 20.414">
      <G data-name="search (1)" transform="translate(1 1)" fill="none" stroke="#d9ba40" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={2}>
        <Circle cx={8} cy={8} r={8} />
        <Path d="M18 18l-4.35-4.35" />
      </G>
    </Svg>
  );
};