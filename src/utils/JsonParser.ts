import { Tag } from '../typings/index';

export function parseTag(json: string): Tag {
  const tag: Tag = { id: 1, name: '' };
  json = json.substring(1, json.length - 1);
  json.split(',').forEach((item: any) => {
    item = item.split(':');
    if (item[0] === 'id') {
      tag.id = parseInt(item[1]);
    } else if (item[0] === 'name') {
      tag.name = item[1];
    }
  });
  return tag;
}
