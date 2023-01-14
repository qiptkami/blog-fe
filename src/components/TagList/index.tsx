import { useEffect, useState } from 'react';
import { Tag } from '../../typings/index';
import { scrollToAnchor } from '../../utils/scrollToAnchor';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.less';

interface IProps {
  data: Tag[];
}

const TagPage: React.FC<IProps> = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [Tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    setTags(data);
  }, [data]);

  const TagList = Tags.map((tag: Tag) => {
    return (
      <div
        className='tag-list-item'
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
export default TagPage;
