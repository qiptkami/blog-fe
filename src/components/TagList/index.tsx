import { useEffect, useState } from 'react';
import { Tag } from '../../typings/index';
import './index.less';

interface IProps {
  data: Tag[];
}

const TagPage: React.FC<IProps> = ({ data }) => {
  const [Tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    setTags(data);
  }, [data]);

  const TagList = Tags.map((Tag) => {
    return (
      <a className='Tag-list-item' key={Tag.id} href={`Tags#${Tag.name}`}>
        <span className='Tag-list-item-content'>{Tag.name}</span>
      </a>
    );
  });
  return (
    <div className='Tag-list-container'>
      <div className='Tag-list-info'>{TagList}</div>
    </div>
  );
};
export default TagPage;
