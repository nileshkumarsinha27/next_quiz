import React, { FC } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

export type CountdownProps = {
  duration?: number;
  colors?: any;
  isPlaying?: boolean;
  size?: number;
  onComplete?: (totalElapsedTime: number) => void;
};

const CountDown: FC<CountdownProps> = ({
  duration = 10,
  colors = [
    ['#3b8070', 0.5],
    ['#2184ff', 0.4],
    ['#d63443', 0.1],
  ],
  isPlaying = true,
  size = 50,
  onComplete = () => {},
}: CountdownProps) => (
  <CountdownCircleTimer
    duration={duration}
    colors={colors}
    isPlaying={isPlaying}
    size={size}
    onComplete={onComplete}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
);

export default CountDown;
