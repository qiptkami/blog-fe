import React from 'react';
import Button from '../Button';
import './index.less';

interface IProps {
  open?: boolean;
  title?: string;
  onOk?: () => void;
  onCancel?: () => void;
  width?: number;
  children?: React.ReactNode;
}

const Modal: React.FC<IProps> = ({
  open,
  title = 'title',
  width,
  onOk,
  onCancel,
  children,
}) => {
  if (!open) {
    return <></>;
  }
  return (
    <>
      <div
        className='modal-wrapper'
        style={{ width: width ? `${width}px` : 'auto' }}
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
            buttonText='取消'
            onClick={() => {
              onCancel?.();
            }}
          />
          <Button
            buttonText='确认'
            style={{ marginLeft: '12px' }}
            onClick={() => {
              onOk?.();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Modal;
