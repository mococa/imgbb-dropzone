export namespace ImgBBService {
  interface ImageBBImage {
    filename: string;
    name: string;
    mime: string;
    extension: string;
    url: string;
  }

  export interface UploadOptions {
    /**
     * Image file name
     */
    name: string;
    /**
     * Image expiration
     */
    expiration: string;
  }

  export interface UploadInput {
    /**
     * Image binary that is going to be uploaded to ImageBB
     */
    image: File;
    /**
     * ImgBB API Key
     */
    api_key: string;
    /**
     * Uploading Options
     */
    options?: Partial<UploadOptions>;
    /**
     * Uploading tracking
     */
    onUploadUpdate?: (percentage: number) => void;
  }

  export interface UploadOutput {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: string;
    height: string;
    size: string;
    time: string;
    expiration: string;
    image: ImageBBImage;
    thumb: ImageBBImage;
    medium: ImageBBImage;
    delete_url: string;
  }
}
