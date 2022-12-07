export interface DocumentData {
  id?: string;
  file: {
    downloadURL: string;
    filename: string;
    path: string;
  };
  name: string;
  type: string;
  creationDate: Date;
  deprecated: boolean;
  code: string;
  area: string;
}
