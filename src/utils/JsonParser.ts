import { Type } from '../typings/index';

export function parseType(json: string): Type {
  console.log(json);
  const type: Type = { id: 1, name: '' };
  json = json.substring(1, json.length - 1);
  json.split(',').forEach((item: any) => {
    item = item.split(':');
    if (item[0] === 'id') {
      type.id = parseInt(item[1]);
    } else if (item[0] === 'name') {
      type.name = item[1];
    }
  });
  return type;
}
