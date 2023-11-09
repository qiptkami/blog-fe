import React, { useEffect, useRef } from 'react';
import Loading from '../Loading';
import './index.less';

interface IProps {
  disabled?: boolean;
  loading?: boolean;
  buttonText?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<IProps> = ({
  disabled = false,
  loading,
  buttonText = 'default',
  onClick,
}) => {
  const clickRef = useRef<any>();

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

  return (
    <button
      ref={clickRef}
      className={loading ? 'button-wrap button-loading' : 'button-wrap'}
      disabled={disabled}
      onClick={onClick}
    >
      {loading && <Loading size={1} style={{ marginRight: '8px' }} />}
      {buttonText}
    </button>
  );
};

export default Button;
