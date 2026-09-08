'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useMotionTemplate, useMotionValue, motion } from 'framer-motion';

export interface AceternityInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const AceternityInput = React.forwardRef<HTMLInputElement, AceternityInputProps>(
  ({ className, type, error, ...props }, ref) => {
    const radius = 120;
    const [visible, setVisible] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <div className="w-full">
        <motion.div
          style={{
            background: useMotionTemplate`
              radial-gradient(
                ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
                #6366f1,
                transparent 80%
              )
            `,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className="p-[2px] rounded-xl transition duration-300 group/input"
        >
          <input
            type={type}
            className={cn(
              `flex h-11 w-full border border-slate-200 bg-slate-50 text-slate-900 rounded-xl px-3.5 py-2 text-sm
              file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:bg-white
              disabled:cursor-not-allowed disabled:opacity-50 transition duration-300 shadow-subtle`,
              error && 'border-red-500 focus-visible:ring-red-500',
              className,
            )}
            ref={ref}
            {...props}
          />
        </motion.div>
        {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
      </div>
    );
  },
);
AceternityInput.displayName = 'AceternityInput';

export const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col space-y-1.5 w-full', className)}>
      {children}
    </div>
  );
};

export const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
