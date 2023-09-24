import { useState } from 'react';
import './index.less';
import classNames from 'classnames';

const titles = [
  {
    title: 'blog',
    children: [
      { title: '博客列表', children: [] },
      { title: 'blog', children: [] },
    ],
  },
  { title: 'tag' },
  { title: 'user' },
  { title: 'history' },
];

const AdminSider: React.FC = () => {
  const [checked, setChecked] = useState<string>('');
  const [clicked, setClicked] = useState<string>('');

  const handleClick = (c: string) => {
    setClicked((prev) => (prev === c ? '' : c));
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
          'sider-blog',
          checked === item.title ? 'sider-blog-checked' : ''
        )}
      >
        <div
          className={classNames(
            'sider-blog-item',
            checked === item.title ? 'sider-blog-item-checked' : ''
          )}
        >
          <i
            className={classNames(
              'blog-icon',
              'iconfont',
              checked === item.title ? 'blog-icon-checked' : ''
            )}
          >
            &#xe7de;
          </i>
        </div>
        <div className='side-blog-content'>{item.title}</div>
        <i className={classNames('drop-icon', 'iconfont')}>&#xe6b9;</i>
      </div>
      {clicked === item.title && <div className='test'>12</div>}
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
