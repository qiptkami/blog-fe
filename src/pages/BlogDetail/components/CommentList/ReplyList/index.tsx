import { Comment } from '../../../../../typings/index';
import { useEffect, useState } from 'react';
import CommentInput from '../CommentInput';
import {
  getCommentInfo,
  insertComment,
} from '../../../../../services/blogPage';
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
  handleSubmit?: (
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
}) => {
  const [rid, setRid] = useState<number>();
  const [isReply, setIsReply] = useState<boolean>(false);
  const [isReplySubmit, setIsReplySubmit] = useState<boolean>(true);
  const [isHover, setIsHover] = useState<boolean>(false);
  /*
  1.如果回复评论发布，就要关闭对应的评论input（v）
  2.如果点开了一个input，再去点当前这个回复，就会关闭对应input （v）
  3.如果点开了一个回复input，再去点击另一个，当前评论框关闭，另一个打开 （x）(同级不能实现)
   */
  useEffect(() => {
    setRid(replyId);
  }, [replyId, rid]);

  const handleSubmit = (
    nickname: string,
    content: string,
    email: string,
    parentId: number
  ) => {
    const comment: Comment = {
      nickname: nickname,
      content: content,
      email: email,
      blog: { id: bid ?? 0 },
      parentComment: { id: parentId ?? 0 },
    };
    setIsReplySubmit(false);
    insertComment(comment);
    getCommentInfo(bid ?? 0);
  };

  const list = replyList?.map((reply: Comment) => {
    return (
      <div className='comment-body' key={reply.id}>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className={
            reply.parentComment
              ? classNames('comment-content', 'comment-content-reply')
              : 'comment-content'
          }
        >
          <img className='comment-avatar' alt='' src={reply.avatar} />
          <div className='comment-header'>
            <div className='comment-user'>
              <div className='comment-user-meta'>
                <span className='comment-nickname'>{reply.nickname}</span>
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
              {isHover && (
                <div
                  className='comment-action'
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
                  <i className={classNames('iconfont', 'icon-comment')}>
                    &#xe689;
                  </i>
                  <div className='comment-action-reply'>回复</div>
                </div>
              )}
            </div>
            <div className='comment-date'>
              {moment(reply.createTime).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <div className='comment-text'>{reply.content}</div>
          </div>
        </div>
        {isReplySubmit && isReply && rid === reply?.id ? (
          <CommentInput
            isReply
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
          ></CommentInput>
        ) : null}
        <ReplyList
          bid={bid}
          replyId={rid}
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
