interface Blog {
  id: number;
  title?: string; //标题
  content?: string; //内容
  firstPicture?: string; //首图
  flag?: string; //原创 转载 ...
  views?: number; //浏览次数
  appreciation?: boolean; //赞赏开启
  shareStatement?: boolean; //转载开启
  commentAble?: boolean; //评论开启
  published?: boolean; //是否发布
  recommend?: boolean; //是否推荐
  createTime?: Date; //创建时间
  updateTime?: Date; //更新时间
  description?: String; //描述
  type?: Type; //对一
  user?: User; //对一
  comments?: Comment[]; //对多
}

interface Type {
  id: number;
  name: string;
  blogs?: Blog[]; //对多
}

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  avatar: string; //头像
  type: string; //类型
  createTime: Date;
  updateTime: Date;
  blogs: Blog[]; //对多
}

interface Comment {
  id?: number;
  nickname?: string; //昵称
  email?: string; //邮箱
  content?: string; //内容
  avatar?: string; //头像地址
  createTime?: Date; //评论时间
  isAdminComment?: boolean; //是否是管理员评论
  blog?: Blog; //对一
  replyComment?: Comment[]; //子回复
  parentComment?: Comment; //父回复
}

export type { Blog, Type, User, Comment };
