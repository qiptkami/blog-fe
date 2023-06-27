import { post } from '../../index';
import { Blog } from '../../../typings/index';

const baseUrl = '/admin';

export const searchBlogList = (param: {
  page: number;
  size: number;
  title?: string;
  tagId?: number;
  query?: string;
}) => post(`${baseUrl}/blogs/search`, param);
