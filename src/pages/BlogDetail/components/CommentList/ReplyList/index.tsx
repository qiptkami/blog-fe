import moment from 'moment';
import { Comment } from '../../../../../typings/index';

interface IProps {
  comment: Comment[];
}

const ReplyList: React.FC<IProps> = ({ comment }) => {
  const replyList = comment?.map((reply: Comment) => {
    return (
      <div className='comment-body' key={reply.id}>
        <a className='comment-avatar'>
          <img src={reply.avatar} />
        </a>
        <div className='comment-content'>
          <a className='comment-author'>
            <span>{reply.nickname}</span>
            {reply.isAdminComment && <div className=''></div>}
            <span className='comment-replyer'>
              {' '}
              回复 @{reply.parentComment.nickname}
            </span>
          </a>
          <div className='comment-date'>
            {moment(reply.createTime).format('YYYY-MM-DD HH:mm:ss')}
          </div>
          <div className='comment-text'>{reply.content}</div>
          <div className='comment-action'>
            <div
              className='reply'
              data-commentnickname='yiqiandewo  th:attr=data-commentid=${reply.id}, data-commentnickname=${reply.nickname}'
              onClick={() => {
                console.log('reply(this)');
              }}
            >
              回复
            </div>
          </div>
        </div>
        <ReplyList comment={reply?.replyComment}></ReplyList>
      </div>
    );
  });
  return <>{replyList}</>;
};

export default ReplyList;
