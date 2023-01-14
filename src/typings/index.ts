interface Blog {
  id: number;
  title?: string; //标题
  content?: string; //内容
  firstPicture?: string; //首图
  flag?: string; //原创 转载 ...
  createTime?: Date; //创建时间
  updateTime?: Date; //更新时间
  description?: String; //描述
  tags?: Tag[]; //对多
  user?: User; //对一
  comments?: Comment[]; //对多
}

interface Tag {
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
  tag: string; //类型
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

export type { Blog, Tag, User, Comment };
