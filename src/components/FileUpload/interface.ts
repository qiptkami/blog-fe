export interface IWaitCalculateFile {
  id: string;
  file: File;
}

export interface IChunkFile {
  hash: string;
  name: string;
  fileChunk: Blob;
}

export interface IWaitUploadedFile {
  id: string;
  file: File;
  chunkList: Array<IChunkFile>;
  hash: string;
}

export interface IUploadedFile {
  fileName: string;
  url: string;
}
