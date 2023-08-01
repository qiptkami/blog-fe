import { _post } from '../index';
import { User } from '../../typings/index';

const baseUrl = '/login';

export const login = (u: User) => _post(`${baseUrl}`, u);
