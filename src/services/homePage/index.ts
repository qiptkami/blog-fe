import { get } from '../index';

const baseUrl = '/blog';

export const getBlogsList = (param?: {
  page: number;
  size: number;
  title?: string;
  tagId?: number;
}) => get(baseUrl + '/pagination', param);

export const getBlogInfo = (id: number) => get(baseUrl + `/${id}`);

export const queryBlog = (param?: {
  query: string;
  page?: number;
  size?: number;
}) => get(baseUrl + '/search', param);
