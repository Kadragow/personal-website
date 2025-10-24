import React from 'react';
import BorderH from 'public/assets/border-h.svg';
import BorderV from 'public/assets/border-v.svg';
import './Background.scss';
import ParticlesCanvas from '@/components/organisms/ParticlesCanvas/ParticlesCanvas';

const Background = (): React.ReactNode => {
  return (
    <div className="background" id="background">
      <ParticlesCanvas />

      <div className="border border--h border--top" />
      <div className="border border--v border--right" />
      <div className="border border--h border--bottom" />
      <div className="border border--v border--left" />
    </div>
  );
};

export default Background;
