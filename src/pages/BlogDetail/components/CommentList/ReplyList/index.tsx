import { Comment } from '../../../../../typings/index';
import { useEffect, useState } from 'react';
import CommentInput from '../CommentInput';

import moment from 'moment';
import classNames from 'classnames';
import './index.less';

interface IProps {
  bid: number;
  replyList?: Comment[];
  replyId?: number;
  getReplyParent: (pid: number) => void;
  uname?: string;
  uEmail?: string;
  handleSubmit: (
    nickname: string,
    content: string,
    email: string,
    parentId: number
  ) => void;
}

const ReplyList: React.FC<IProps> = ({
  replyList,
  getReplyParent,
  replyId,
  bid,
  uname,
  uEmail,
  handleSubmit,
}) => {
  const [rid, setRid] = useState<number>();
  const [isReply, setIsReply] = useState<boolean>(false);
  const [isReplySubmit, setIsReplySubmit] = useState<boolean>(true);

  useEffect(() => {
    setRid(replyId);
  }, [replyId, rid]);

  const list = replyList?.map((reply: Comment) => {
    return (
      <div key={reply.id}>
        <div className='comment-wrap'>
          <div
            className={classNames(
              'comment-content',
              reply.parentComment ? 'comment-content-reply' : ''
            )}
          >
            <img className='comment-avatar' alt='' src={reply.avatar} />
            <div className='comment-main'>
              <div className='comment-user-meta'>
                <span className='comment-nickname'>{reply.nickname} </span>
                {reply.isAdminComment && (
                  <div className='comment-author'>(作者)</div>
                )}
                {reply.parentComment && (
                  <span className='comment-replier'>
                    {' '}
                    回复 @{reply.parentComment.nickname}
                  </span>
                )}
              </div>
              <div className='comment-text'>{reply.content}</div>
              <div className='comment-info'>
                <div className='comment-date'>
                  {moment(reply.createTime).format('YYYY-MM-DD HH:mm:ss')}
                </div>
                <div
                  className='comment-action-reply'
                  onClick={() => {
                    getReplyParent(reply?.id ?? 0);
                    if (rid === reply?.id) {
                      setRid(-1);
                      setIsReply((prev) => !prev);
                    } else {
                      setRid(reply?.id);
                      if (!isReply) {
                        setIsReply(true);
                      }
                    }
                  }}
                >
                  回复
                </div>
              </div>
            </div>
          </div>
          <div className='sub-comment'>
            <ReplyList
              bid={bid}
              replyId={rid}
              replyList={reply?.replyComment}
              getReplyParent={getReplyParent}
              uname={uname}
              uEmail={uEmail}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
        {isReplySubmit && isReply && rid === reply?.id ? (
          <CommentInput
            parent={reply}
            uname={uname}
            uEmail={uEmail}
            handleSubmit={(
              nickname: string,
              content: string,
              email: string,
              parentId: number
            ) => {
              handleSubmit(nickname, content, email, parentId);
              setIsReplySubmit(false);
            }}
          />
        ) : null}
      </div>
    );
  });
  return <>{list}</>;
};

export default ReplyList;
