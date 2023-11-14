import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import './index.less';
import { useEffect, useState } from 'react';

interface IMenu {
  title: string;
  icon: string;
}

const menus: IMenu[] = [
  { title: 'blogs', icon: '&#xe7de;' },
  { title: 'tags', icon: '&#xe87c;' },
  { title: 'history', icon: '&#xe674;' },
];

interface IProps {
  activeUrl?: string;
}

const AdminSider: React.FC<IProps> = ({ activeUrl }) => {
  const navigate = useNavigate();
  const [userInfo, serUserInfo] = useState<any>({});

  useEffect(() => {
    const user = localStorage.getItem('userInfo');
    if (!user) {
      navigate('/admin/login');
      return;
    }
    serUserInfo(JSON.parse(user));
  }, []);

  const handleClick = (c: string) => {
    navigate(`/admin/${c}`);
  };

  const items = menus.map((menu: IMenu, index: number) => (
    <div
      className='sider-item'
      key={index}
      onClick={() => handleClick(menu.title)}
    >
      <div
        className={classNames(
          'sider-item-wrapper',
          activeUrl === menu.title ? 'sider-item-wrapper-checked' : ''
        )}
      >
        <div
          className={classNames(
            'sider-item-icon',
            activeUrl === menu.title ? 'sider-item-icon-checked' : ''
          )}
        >
          <i
            className={classNames(
              'sider-icon',
              'iconfont',
              activeUrl === menu.title ? 'icon-checked' : ''
            )}
          >
            <span dangerouslySetInnerHTML={{ __html: menu.icon }}></span>
          </i>
        </div>
        <div className='side-item-content'>{menu.title}</div>
      </div>
    </div>
  ));

  return (
    <div className='admin-sider'>
      <div className='sider-title'>喜多喜多</div>
      <div className='sider-line' />
      {items}

      <div className='sider-user'>
        <img className='sider-user-avatar' src={userInfo?.avatar} alt='' />
        <span className='sider-user-name'>{userInfo?.username}</span>
      </div>
    </div>
  );
};

export default AdminSider;
