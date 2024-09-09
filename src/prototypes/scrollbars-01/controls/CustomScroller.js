import React, { forwardRef } from 'react';

import useCustomScroller from './useCustomScroller';

//import styles from './CustomScroller.css';

//const cx = (...args) => args.filter(Boolean).join(' ');

export const CustomScroller = forwardRef(
  ({ scrollDisabled, className, innerClassName, children, ...props }, ref) => {
    const [wrapperProps, scrollerProps, trackProps] = useCustomScroller(
      children,
      ref,
      { disabled: scrollDisabled },
    );

    return (
      <div className={""} {...props}>
        <div className={""} {...wrapperProps}>
          <div className={""} {...scrollerProps}>
            {children}
          </div>
        </div>
        <div className={""} {...trackProps} />
      </div>
    );
  },
);


