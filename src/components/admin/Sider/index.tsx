import { useEffect, useState } from 'react';
import './index.less';
import classNames from 'classnames';

import { useNavigate, useLocation } from 'react-router-dom';

const titles = [
  { title: 'blogs', icon: '&#xe7de;' },
  { title: 'tags', icon: '&#xe87c;' },
  { title: 'user', icon: '&#xe6b5;' },
  { title: 'history', icon: '&#xe674;' },
];

const AdminSider: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const res = location.pathname.split('/');
    setChecked(res[res.length - 1]);
  }, [location]);

  const [checked, setChecked] = useState<string>('');

  const handleClick = (c: string) => {
    setChecked(c);
  };

  const items = titles.map((item: any, index: number) => (
    <div
      className='sider-item'
      key={index}
      onClick={() => handleClick(item.title)}
    >
      <div
        className={classNames(
          'sider-item-wrapper',
          checked === item.title ? 'sider-item-wrapper-checked' : ''
        )}
      >
        <div
          className={classNames(
            'sider-item-icon',
            checked === item.title ? 'sider-item-icon-checked' : ''
          )}
        >
          <i
            className={classNames(
              'sider-icon',
              'iconfont',
              checked === item.title ? 'icon-checked' : ''
            )}
          >
            <span dangerouslySetInnerHTML={{ __html: item.icon }}></span>
            {/* &#xe87c; {item.icon} */}
          </i>
        </div>
        <div className='side-item-content'>{item.title}</div>
      </div>
    </div>
  ));

  return (
    <div className='admin-sider'>
      <div className='sider-title'>喜多喜多</div>
      <div className='sider-line' />
      {items}
    </div>
  );
};

export default AdminSider;
