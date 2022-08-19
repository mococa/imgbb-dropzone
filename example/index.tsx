/* ---------- External ---------- */
import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

/* ---------- Package ---------- */
import { ImageBBData, ImgbbDropzone, ImgbbProvider } from '../src';

/* ---------- Interfaces ---------- */
interface UploadedImages {
  image: string;
  thumbnail: string;
  id: string;
}

const App = () => {
  /* ---------- States ---------- */
  const [uploaded_pics, setUploadedPics] = React.useState<UploadedImages[]>([]);
  const [upload_progress, setUploadedProgress] = React.useState<null | number>(
    null
  );
  const [drag_over, setDragOver] = React.useState<boolean>(false);

  /* ---------- Handlers ---------- */
  const handleUpdateList = (data?: ImageBBData) => {
    if (!data) return;

    setUploadedPics(previous_pictures => [
      ...previous_pictures,
      {
        image: data.image.url,
        thumbnail: data.display_url,
        id: data.id + new Date().getTime(),
      },
    ]);
  };

  /* ---------- Renderers ---------- */
  const renderDraggingOver = () => <h3>Drop to Upload</h3>;

  const renderDragOut = () => (
    <h3>
      {upload_progress ? 'Uploading...' : 'Click or drag an image into here'}
    </h3>
  );

  return (
    <div className="App">
      <div className="uploaded-pics">
        {uploaded_pics.map(picture => (
          <a key={picture.id} href={picture.image} target="_blank">
            <img src={picture.thumbnail} />
          </a>
        ))}
      </div>

      <ImgbbDropzone
        allowed_types={['image/png', 'image/jpeg', 'image/gif']}
        onDragIn={() => setDragOver(true)}
        onDragOut={() => setDragOver(false)}
        onUploadFinished={({ data }) => handleUpdateList(data)}
        onUploadProgress={progress => {
          setDragOver(false);
          setUploadedProgress(progress);
        }}
      >
        <div className="dropzone">
          {drag_over ? renderDraggingOver() : renderDragOut()}

          {upload_progress !== null && (
            <div className="dropzone-progress">{upload_progress}%</div>
          )}
        </div>
      </ImgbbDropzone>
    </div>
  );
};

/* ---------- Constants ---------- */
const IMGBB_API_KEY = '81e1f65f1f588db73e831f1b5477cec1';

ReactDOM.render(
  <ImgbbProvider imgbb_api_key={IMGBB_API_KEY}>
    <App />
  </ImgbbProvider>,
  document.getElementById('root')
);
