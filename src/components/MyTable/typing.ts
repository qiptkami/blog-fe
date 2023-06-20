export interface IColumn {
  title: string;
  dataIndex: string;
  render?: (_: any) => JSX.Element;
  width?: string;
  ellipsis?: boolean;
  hideInSearch?: boolean;
  valueType?: ESearchType | string;
  valueEnum?: { value: string | number; label: string }[];
}

export enum ESearchType {
  text = 'text',
  select = 'select',
}

export interface Param {
  page: number;
  size: number;
}
