import React, { useState, useEffect } from 'react';

import { IUploadedFile } from './interface';
import UpLoadFileClass from './uploadFile';

import './index.less';

interface IProps {
  url?: string;
  onChange: (url: string) => void;
}

const FileUpload: React.FC<IProps> = ({ url, onChange }) => {
  const [uploadedFile, setUploadedFile] = useState<IUploadedFile>();
  const [uploadClass, setUploadClass] = useState<UpLoadFileClass>();
  const [imgUrl, setImgUrl] = useState<string>('');

  useEffect(() => {
    url && setImgUrl(url);
  }, [url]);

  useEffect(() => {
    setUploadClass(
      new UpLoadFileClass({
        updateUploadedFile: setUploadedFile,
        chunkSize: 2 * 1024 * 1024,
        concurrency: 4,
      })
    );
  }, []);

  useEffect(() => {
    if (!uploadedFile?.url) return;
    setImgUrl(uploadedFile?.url);
    onChange(uploadedFile?.url);
  }, [uploadedFile]);

  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || !uploadClass) return;
    uploadClass.addNewFile(fileList[0]);
  };

  return (
    <div className='upload-file'>
      {imgUrl ? (
        <>
          <label htmlFor='fileInput'>
            <img
              className='upload-file-img'
              src={imgUrl}
              alt=''
              onError={(e: any) => {
                e.target.src = '';
              }}
            />
          </label>
          <input
            id={'fileInput'}
            type='file'
            title=''
            onChange={(e) => handleInputFileChange(e)}
          />
        </>
      ) : (
        <div className='upload-file-container'>
          <i className='iconfont upload-icon'>&#xe69d;</i>
          <input
            type='file'
            title=''
            multiple
            onChange={(e) => handleInputFileChange(e)}
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
