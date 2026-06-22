import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/formatCurrency';

const DonationProgressBar = ({ raised, needed, showLabels = true }) => {
  const percentage = Math.min((raised / needed) * 100, 100);

  return (
    <div className="w-full">
      {showLabels && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold text-primary-dark font-body">
            {formatCurrency(raised)} raised
          </span>
          <span className="text-sm text-neutral-gray font-body">
            Goal: {formatCurrency(needed)}
          </span>
        </div>
      )}
      <div className="w-full bg-neutral-light rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-medium to-primary-dark rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
      {showLabels && (
        <p className="text-right text-xs text-neutral-gray mt-1 font-body">
          {percentage.toFixed(0)}% funded
        </p>
      )}
    </div>
  );
};

export default DonationProgressBar;