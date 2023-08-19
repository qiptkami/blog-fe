import { Blog } from '../../typings/index';
import { _get, _delete, _put, _post } from '../index';

const baseUrl = '/blog';

export const getBlogsList = (param?: {
  page: number;
  size: number;
  title?: string;
  tagId?: number;
}) => _get(baseUrl + '/pagination', param);

export const getBlogInfo = (id: number) => _get(baseUrl + `/${id}`);

export const queryBlog = (param?: {
  query: string;
  page?: number;
  size?: number;
}) => _get(baseUrl + '/search', param);

export const editBlog = (blog: Blog) => _put(baseUrl, blog);

export const addBlog = (blog: Blog) => _post(baseUrl, blog);

export const delBlog = (id: number) => _delete(baseUrl + `/${id}`);
