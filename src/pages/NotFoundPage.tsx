import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import { PrimaryButton } from '@/components/common/PrimaryButton';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-groww-emerald/15 text-emerald-700 dark:text-groww-emerald border border-groww-emerald/25 flex items-center justify-center mb-2">
        <Compass className="w-8 h-8 motion-safe:animate-spin-slow" aria-hidden="true" />
      </div>

      <span className="text-xs font-bold text-emerald-700 dark:text-groww-emerald uppercase tracking-wider">
        404 — Path Not Found
      </span>

      <h1 className="text-xl sm:text-2xl font-extrabold text-content-primary">
        You've wandered off the compass map.
      </h1>

      <p className="text-xs sm:text-sm text-content-secondary max-w-xs leading-relaxed">
        The page or comparison option you're looking for doesn't exist or has moved. Let's get you
        back on course.
      </p>

      <div className="w-full max-w-xs pt-4">
        <PrimaryButton onClick={() => navigate('/')} icon={ArrowLeft}>
          Return to Explore
        </PrimaryButton>
      </div>
    </div>
  );
};
