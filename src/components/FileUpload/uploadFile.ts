import {
  IWaitCalculateFile,
  IWaitUploadedFile,
  IUploadedFile,
  IChunkFile,
} from './interface';
import { mergeRequest, uploadFileRequest, verifyRequest } from './request';
import { calculateFilesHash, createFileChunk } from './tool';

interface IProps {
  chunkSize: number;
  concurrency: number;
  updateUploadedFile: (file: IUploadedFile) => void;
}

export default class UpLoadFileClass {
  updateUploadedFile: (file: IUploadedFile) => void;
  chunkSize: number;
  concurrency: number;
  constructor(props: IProps) {
    this.chunkSize = props.chunkSize;
    this.concurrency = props.concurrency;
    this.updateUploadedFile = props.updateUploadedFile;
  }

  public addNewFile = async (file: File) => {
    if (!file) return;
    const waitCalculateFile = {
      id: `${file.name}_${new Date().getTime()}`,
      file: file,
    };
    this.calculateFileHash(waitCalculateFile);
  };

  private calculateFileHash = async (waitCalculateFile: IWaitCalculateFile) => {
    const file = waitCalculateFile.file;
    if (file) {
      const fileChunk = createFileChunk(file, this.chunkSize);
      let hash: string = (await calculateFilesHash(fileChunk)) as string;
      const uploadFile = {
        id: waitCalculateFile.id || `${file.name}_${new Date().getTime()}`,
        file: file,
        chunkList: fileChunk,
        hash: hash,
      };
      uploadFile.chunkList.forEach((item: IChunkFile, index: number) => {
        item.hash = `${hash}_${index}`;
        item.name = hash;
      });
      this.upload(uploadFile); // 上传文件
    }
  };

  private getExtendName = (nameStr: string): string => {
    return nameStr.split('.')[nameStr.split('.').length - 1];
  };

  private upload = async (uploadFile: IWaitUploadedFile) => {
    //根据hash => 服务端有没有该文件的切片，如果有，则filter掉
    const response: any = await verifyRequest({
      fileName: uploadFile.file.name,
      hash: uploadFile.hash,
    });
    const data = JSON.parse(response.data);
    if (data.value) {
      this.completeUpload(uploadFile, data.url);
      return;
    } else {
      const existChunkList = data.existChunkList;
      uploadFile.chunkList = uploadFile.chunkList.filter((item: IChunkFile) => {
        return existChunkList.indexOf(item.hash) === -1;
      });
    }

    uploadFileRequest(uploadFile, this.concurrency).then(async () => {
      const response: any = await mergeRequest({
        fileName: uploadFile.hash,
        newFileName: `${uploadFile.hash}.${this.getExtendName(
          uploadFile.file.name
        )}`,
        fileSize: uploadFile.file.size,
        chunkSize: this.chunkSize,
      });
      const imgInfo = JSON.parse(response.data);
      this.completeUpload(uploadFile, imgInfo.url);
    });
  };

  private completeUpload = (uploadFile: IWaitUploadedFile, url: string) => {
    this.updateUploadedFile({
      fileName: uploadFile.file.name,
      url: url,
    });
  };
}
