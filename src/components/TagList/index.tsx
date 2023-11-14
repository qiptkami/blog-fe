import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToAnchor } from '../../utils/scrollToAnchor';
import { Tag } from '../../typings/index';
import { COLOR } from './enum';
import './index.less';

interface IProps {
  data: Tag[];
}

const TagList: React.FC<IProps> = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [Tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    setTags(data);
  }, [data]);

  const TagList = Tags.map((tag: Tag) => {
    const c = COLOR[Math.floor(Math.random() * COLOR.length)];
    return (
      <div
        className='tag-list-item'
        style={{
          backgroundColor: c.backgroundColor,
          color: c.color,
        }}
        key={tag.id}
        onClick={() => {
          scrollToAnchor(location.pathname, '/tags', tag?.name, navigate);
        }}
      >
        <span className='tag-list-item-content'>{tag.name}</span>
      </div>
    );
  });
  return (
    <div className='tag-list-container'>
      <div className='tag-list-info'>{TagList}</div>
    </div>
  );
};
export default TagList;
