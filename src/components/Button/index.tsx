import React, { useEffect, useRef } from 'react';
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
  buttonText?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<IProps> = ({
  size = 'default',
  className,
  style,
  disabled = false,
  loading,
  buttonText = 'default',
  onClick,
}) => {
  const clickRef = useRef<any>();
  const loadingRef = useRef<any>();

  useEffect(() => {
    const clickEle = clickRef.current;
    clickEle.addEventListener('click', (event: PointerEvent) => {
      const rippleEle = document.createElement('span');
      const x = event.clientX - clickEle.getBoundingClientRect().x;
      const y = event.clientY - clickEle.getBoundingClientRect().y;
      rippleEle.style.left = `${x}px`;
      rippleEle.style.top = `${y}px`;
      rippleEle.classList.add('ripple');
      clickEle.appendChild(rippleEle);
      rippleEle.addEventListener('animationend', () => {
        clickEle.removeChild(rippleEle);
      });
    });
  }, []);

  useEffect(() => {
    if (loading) {
      const newContainer = document.createElement('span');
      loadingRef.current = newContainer;
      newContainer.classList.add('loading-wrap');
      clickRef.current.appendChild(newContainer);

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
      ref={clickRef}
      style={style}
      className={classNames(
        `button-${size}`,
        'button-wrap',
        loading ? 'button-loading' : '',
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
