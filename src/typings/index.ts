interface Blog {
  id: number;
  title?: string; //标题
  content?: string; //内容
  firstPicture?: string; //首图
  createTime?: string; //创建时间
  updateTime?: string; //更新时间
  description?: string; //描述
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
  id?: number;
  username: string;
  password: string;
  email?: string;
  avatar?: string; //头像
  createTime?: string;
  updateTime?: string;
  blogs?: Blog[]; //对多
}

interface Comment {
  id?: number;
  nickname?: string; //昵称
  email?: string; //邮箱
  content?: string; //内容
  avatar?: string; //头像地址
  createTime?: string; //评论时间
  isAdminComment?: boolean; //是否是管理员评论
  blog?: Blog; //对一
  replyComment?: Comment[]; //子回复
  parentComment?: Comment; //父回复
}

export type { Blog, Tag, User, Comment };
