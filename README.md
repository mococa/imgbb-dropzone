# ImgBB Dropzone

### Installation

```bash
yarn add imgbb-dropzone
```

### Demo

![Peek 2022-08-16 00-12](https://user-images.githubusercontent.com/13316723/184790405-7c9dc908-9676-40c1-be74-617ee02382ae.gif)

### Usage

```tsx
const App = () => {
  // When it's not uploading, upload_progress = null
  const [upload_progress, setUploadProgress] = useState<number | null>(null);

  return (
    <div>
      <ImgbbDropzone
        imgbb_api_key="YOUR-IMGBB-API-KEY"
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
```
