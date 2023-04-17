import classNames from 'classnames';
import { useState } from 'react';
import './index.less';

interface IProps {
  description?: string;
  onOk?: () => void;
  onCancel?: () => void;
  children: any;
}

const PopConfirm: React.FC<IProps> = ({
  description,
  onOk,
  onCancel,
  children,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div style={{ position: 'relative' }}>
      <div
        className={classNames('confirm-container', visible ? 'show' : 'hidden')}
      >
        <div className='confirm-info'>
          <i className={classNames('iconfont', 'icon-warn')}>&#xe652;</i>
          {description}
        </div>
        <div className='confirm-options'>
          <button
            type='button'
            onClick={(e) => {
              onOk?.();
              setVisible(false);
            }}
            className='confirm-btn'
          >
            No
          </button>
          <button
            type='button'
            onClick={() => {
              onCancel?.();
              setVisible(false);
            }}
            className={classNames('confirm-btn', 'primary')}
            style={{ marginLeft: '5px' }}
          >
            Yes
          </button>
        </div>
        <div className='confirm-arrow'></div>
      </div>
      <div onClick={() => setVisible((prev) => !prev)}>{children}</div>
    </div>
  );
};
export default PopConfirm;
