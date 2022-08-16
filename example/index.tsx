import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ImgbbDropzone } from '../src';

const App = () => {
  const [upload_progress, setUploadProgress] = React.useState<number | null>(
    null
  );

  return (
    <div>
      <ImgbbDropzone
        imgbb_api_key="API-KEY"
        allowed_types={['image/png', 'image/jpeg']}
        onUploadFinished={console.log}
        onDragOver={() => console.log('image over dropzone')}
        onUploadProgress={setUploadProgress}
      >
        <h1>Drop a file or click</h1>
        {upload_progress !== null && `${upload_progress}%`}
      </ImgbbDropzone>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
