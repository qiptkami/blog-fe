import { useState } from 'react';
import './index.less';

interface IProps {
  activeUrl?: string;
}

const AdminHeader: React.FC<IProps> = ({ activeUrl }) => {
  console.log('activeUrl: ', activeUrl);

  const getData = (page: number) => {};

  return <div className='admin-header'>/blog/edit</div>;
};

export default AdminHeader;
