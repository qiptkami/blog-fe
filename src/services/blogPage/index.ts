import { get, post } from '../index';
import { Comment } from '../../typings/index';

const baseUrl = '/comments';

export const getCommentInfo = (id: number) => get(baseUrl + `/${id}`);

export const insertComment = (comment: Comment) => post(baseUrl, comment);
