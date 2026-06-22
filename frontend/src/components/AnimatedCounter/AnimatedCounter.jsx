import React from 'react';
import { useCountUp } from '../../hooks/useCountUp';

const AnimatedCounter = ({ end, prefix = '', suffix = '', duration = 2000, label = '' }) => {
  const { count, ref } = useCountUp(end, duration);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-primary-dark font-heading">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      {label && (
        <p className="text-sm text-neutral-gray mt-2 font-body">{label}</p>
      )}
    </div>
  );
};

export default AnimatedCounter;