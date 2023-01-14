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

  const TagList = Tags.map((tag: Tag) => {
    return (
      <a
        className='tag-list-item'
        key={tag.id}
        href={`/Tags#${tag.name}`}
        onClick={() => {
          console.log(tag);
        }}
      >
        <span className='tag-list-item-content'>{tag.name}</span>
      </a>
    );
  });
  return (
    <div className='tag-list-container'>
      <div className='tag-list-info'>{TagList}</div>
    </div>
  );
};
export default TagPage;
