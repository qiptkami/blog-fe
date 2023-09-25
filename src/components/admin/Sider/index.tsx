import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import './index.less';

const titles = [
  { title: 'blogs', icon: '&#xe7de;' },
  { title: 'tags', icon: '&#xe87c;' },
  { title: 'user', icon: '&#xe6b5;' },
  { title: 'history', icon: '&#xe674;' },
];

interface IProps {
  activeUrl?: string;
}

const AdminSider: React.FC<IProps> = ({ activeUrl }) => {
  const navigate = useNavigate();

  const handleClick = (c: string) => {
    navigate(`/admin/${c}`);
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
          activeUrl === item.title ? 'sider-item-wrapper-checked' : ''
        )}
      >
        <div
          className={classNames(
            'sider-item-icon',
            activeUrl === item.title ? 'sider-item-icon-checked' : ''
          )}
        >
          <i
            className={classNames(
              'sider-icon',
              'iconfont',
              activeUrl === item.title ? 'icon-checked' : ''
            )}
          >
            <span dangerouslySetInnerHTML={{ __html: item.icon }}></span>
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
