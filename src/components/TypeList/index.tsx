import { useEffect, useState } from 'react';
import { Type } from '../../typings/index';
import './index.less';

interface IProps {
  data: Type[];
}

const TypePage: React.FC<IProps> = ({ data }) => {
  const [types, setTypes] = useState<Type[]>([]);

  useEffect(() => {
    setTypes(data);
  }, [data]);

  const typeList = types.map((type) => {
    return (
      <a className='type-list-item' key={type.id} href={`types#${type.name}`}>
        <span className='type-list-item-content'>{type.name}</span>
      </a>
    );
  });
  return (
    <div className='type-list-container'>
      <div className='type-list-info'>{typeList}</div>
    </div>
  );
};
export default TypePage;
