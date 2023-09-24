import React from 'react';
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
          <button className='btn' onClick={onCancel}>
            取消
          </button>
          <button
            className='btn primary'
            style={{ marginLeft: '12px' }}
            onClick={onOk}
          >
            确认
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
