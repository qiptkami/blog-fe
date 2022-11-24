import moment from 'moment';
import {
  ClockCircleFilled,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { Comment } from '../../../../../typings/index';
import './index.less';
import classnames from 'classnames';
import { useState } from 'react';
import CommentInput from '../CommentInput';

interface IProps {
  bid: number;
  replyList?: Comment[];
  getReplyParent: (pid: number) => void;
  uname?: string;
  uEmail?: string;
}

const ReplyList: React.FC<IProps> = ({
  replyList,
  getReplyParent,
  bid,
  uname,
  uEmail,
}) => {
  const [isReply, setIsReply] = useState<boolean>(false);
  const list = replyList?.map((reply: Comment) => {
    return (
      <div className='comment-body' key={reply.id}>
        <div
          className={
            reply.parentComment
              ? classnames('comment-content', 'comment-content-reply')
              : 'comment-content'
          }
        >
          <div className='comment-header'>
            <div className='comment-user'>
              <div className='comment-avatar'>
                <img src={reply.avatar} />
              </div>
              <span className='comment-nickname'>{reply.nickname}</span>
              {reply.isAdminComment && (
                <div className='comment-author'>(作者)</div>
              )}
              {reply.parentComment && (
                <span className='comment-replyer'>
                  回复 @{reply.parentComment.nickname}
                </span>
              )}
            </div>
            <div className='comment-date'>
              <ClockCircleFilled />
              {moment(reply.createTime).format('YYYY-MM-DD HH:mm:ss')}
            </div>
          </div>
          <div className='comment-text'>{reply.content}</div>
          <div className='comment-action'>
            <div className='comment-action-like'>
              <LikeOutlined />
              点赞
            </div>
            <div
              className='comment-action-reply'
              onClick={() => {
                console.log(reply);
                getReplyParent(reply.id);
                setIsReply((prev) => !prev);
              }}
            >
              <MessageOutlined />
              回复
            </div>
          </div>
          {isReply ? (
            <CommentInput
              parent={reply}
              bid={bid}
              uname={uname}
              uEmail={uEmail}
            ></CommentInput>
          ) : null}
        </div>
        <ReplyList
          bid={bid}
          replyList={reply?.replyComment}
          getReplyParent={getReplyParent}
          uname={uname}
          uEmail={uEmail}
        ></ReplyList>
      </div>
    );
  });
  return <>{list}</>;
};

export default ReplyList;
