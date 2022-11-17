import { get } from '../index';

const baseUrl = '/home';

export const getBlogsPaginationInfo = (param?: {
  page: number;
  size: number;
}) => get(baseUrl + '/pagination', param);

export const getRankingInfo = () => get(baseUrl + '/ranking');

export const getBlogInfo = (id: number) => get(baseUrl + `/blog/${id}`);
