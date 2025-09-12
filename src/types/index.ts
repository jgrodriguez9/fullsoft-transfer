export interface ExampleData {
  id: number;
  name: string;
  description: string;
}

export interface RootState {
  example: ExampleData[];
}

export type FetchExampleResponse = ExampleData[];

export interface SelectOption {
  value: string;
  label: string;
}
export interface ZoneTable {
  _id: string;
  name: string;
  decription: string;
  active: boolean;
}
export interface ZoneList {
  data: ZoneTable[];
  total: number;
  page: number;
  pages: number;
}

export interface Pagination {
  pageIndex: number;
  pageSize: number;
}
