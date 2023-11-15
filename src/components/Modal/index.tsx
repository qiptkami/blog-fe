import React, { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import './index.less';

interface IProps {
  visible?: boolean;
  title?: string;
  onOk?: () => void;
  onCancel?: () => void;
  width?: number;
  children?: React.ReactNode;
}

const Modal: React.FC<IProps> = ({
  visible,
  title = 'title',
  width = 520,
  onOk,
  onCancel,
  children,
}) => {
  const [first, setFirst] = useState<boolean>(true);

  const wrapRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (first && visible) {
      const modalEle = modalRef.current!;
      const wrapEle = wrapRef.current!;

      modalEle.classList.add('modal-enter');
      wrapEle.style.display = 'block';
      setTimeout(() => {
        modalEle.classList.remove('modal-enter');
      }, 300);
      setFirst(false);
    } else if (!first && visible) {
      const modalEle = modalRef.current!;
      const wrapEle = wrapRef.current!;

      wrapEle.style.display = 'block';
      modalEle.classList.add('modal-enter');
      setTimeout(() => {
        modalEle.classList.remove('modal-enter');
      }, 300);
    } else if (!visible && !first) {
      const modalEle = modalRef.current!;
      const wrapEle = wrapRef.current!;

      modalEle.classList.add('modal-leave');
      setTimeout(() => {
        modalEle.classList.remove('modal-leave');
        wrapEle.style.display = 'none';
      }, 300);
    }
  }, [first, visible]);

  if (first && !visible) {
    return null;
  }

  return (
    <div className='modal-wrap' ref={wrapRef}>
      <div
        ref={modalRef}
        className='modal'
        style={{
          width: `${width}px`,
        }}
      >
        <i className='iconfont icon-modal-close' onClick={onCancel}>
          &#xe723;
        </i>
        <div className='modal-header'>
          <span>{title}</span>
        </div>
        <div className='modal-body'>{children}</div>
        <div className='modal-footer'>
          <Button
            text='取消'
            onClick={() => {
              onCancel?.();
            }}
          />
          <Button
            text='确认'
            style={{ marginLeft: '12px' }}
            onClick={() => {
              onOk?.();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
