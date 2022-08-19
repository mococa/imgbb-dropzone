# ImgBB Dropzone

ImgBB dropzone for React

### Installation

```bash
yarn add imgbb-dropzone
```

### Demo

![Peek 2022-08-18 23-14](https://user-images.githubusercontent.com/13316723/185527840-a3651415-fbf0-4a7f-bebd-a604c660a3b8.gif)

### Usage

#### Context

Wrap your application with the `ImgbbProvider`, passing as props the API key `imgbb_api_key`, like so:

**Typescript example**

```tsx
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ImgbbProvider imgbb_api_key="API-KEY-HERE">
      <App />
    </ImgbbProvider>
  </React.StrictMode>
);
```

---

#### Component

Then, use it like this (Example of the Demo GIF):

**Typescript example**

```tsx
const App = () => {
  const [uploaded_pics, setUploadedPics] = React.useState<UploadedImages[]>([]);
  const [upload_progress, setUploadedProgress] = React.useState<null | number>(
    null
  );
  const [drag_over, setDragOver] = React.useState<boolean>(false);

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
```
