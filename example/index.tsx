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
        imgbb_api_key="81e1f65f1f588db73e831f1b5477cec1"
        allowed_types={['image/png', 'image/jpeg']}
        onUploadFinished={({ data }) => console.log(data?.display_url)}
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
