import { _get, _post } from '../index';
import { Comment } from '../../typings/index';

const baseUrl = '/comments';

export const getCommentInfo = (id: number) => _get(baseUrl + `/${id}`);

export const insertComment = (comment: Comment) => _post(baseUrl, comment);
