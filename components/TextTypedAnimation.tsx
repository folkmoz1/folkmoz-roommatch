'use client';
import { TypeAnimation } from 'react-type-animation';
import type { Speed } from 'react-type-animation/dist/cjs/components/TypeAnimation/index.types';

export const TextTypedAnimation = ({
  sequence,
  speed = 40,
}: {
  sequence: Array<string | number>;
  speed?: Speed;
}) => {
  return (
    <>
      <TypeAnimation
        wrapper={'span'}
        style={{ fontWeight: 700, fontSize: '3.75rem', lineHeight: '6rem' }}
        sequence={sequence}
        cursor
        preRenderFirstString
        repeat={Infinity}
        speed={speed}
      />
    </>
  );
};
