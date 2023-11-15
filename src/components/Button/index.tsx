import React, { useCallback, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import classNames from 'classnames';
import Loading from '../Loading';

import './index.less';

type SizeType = 'small' | 'default' | 'large' | undefined;

interface IProps {
  size?: SizeType;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  loading?: boolean;
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<IProps> = ({
  size = 'default',
  className,
  style,
  disabled = false,
  loading,
  text = 'default',
  onClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null!);
  const loadingRef = useRef<HTMLSpanElement>();

  const rippleAnimation = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const button = buttonRef.current;
      const rippleEle = document.createElement('span');
      const x = event.clientX - button.getBoundingClientRect().x;
      const y = event.clientY - button.getBoundingClientRect().y;
      rippleEle.style.left = `${x}px`;
      rippleEle.style.top = `${y}px`;
      rippleEle.classList.add('ripple');
      button.appendChild(rippleEle);
      rippleEle.addEventListener('animationend', () => {
        button.removeChild(rippleEle);
      });
    },
    []
  );

  useEffect(() => {
    if (loading) {
      const newContainer = document.createElement('span');
      loadingRef.current = newContainer;
      newContainer.classList.add('loading-wrap');
      buttonRef.current!.appendChild(newContainer);

      const root = createRoot(newContainer);
      root.render(<Loading size={1} />);

      setTimeout(() => {
        newContainer.style.width = '14px';
        newContainer.style.opacity = '1';
      }, 0);
    } else {
      if (loadingRef.current) {
        loadingRef.current.remove();
      }
    }
  }, [loading]);

  return (
    <button
      ref={buttonRef}
      style={style}
      className={classNames(
        `button-${size}`,
        'button-wrap',
        loading ? 'button-loading' : '',
        className
      )}
      disabled={disabled}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        rippleAnimation(e);
        onClick?.(e);
      }}
    >
      {text}
    </button>
  );
};

export default Button;
