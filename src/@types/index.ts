export namespace ImgBBService {
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
     * Uploading tracking (percentage uploaded)
     */
    onUploadUpdate?: (percentage: number) => void;
  }

  export interface UploadOutput {
    /**
     * Image data
     */
    data?: ImageBBData;
    /**
     * HTTP status code
     */
    status: number;
    /**
     * Whether HTTP call was successfully or not
     */
    success?: boolean;
  }
}

export interface ImageBBImage {
  filename: string;
  name: string;
  mime: string;
  extension: string;
  url: string;
}

export interface ImageBBData {
  /**
   * Image ID.
   *
   * E.g: "4PkwbDs"
   */
  id: string;
  /**
   * Image title. If it was not set in upload, it becomes a random hash.
   *
   * E.g: "80f6dccc6366300ac6685a23acd43734"
   */
  title: string;
  /**
   * Link to image viewer.
   *
   * E.g: "https://ibb.co/PkwbDs"
   */
  url_viewer: string;
  /**
   * Full sized image link.
   *
   * E.g: "https://i.ibb.co/nzpq9LJ/80f6dccc6366304564d685a23acd43734.jpg"
   */
  url: string;
  /**
   * Medium sized image link.
   *
   * E.g: "https://i.ibb.co/aSda23aa/80f6dccc6366304564d685a23acd43734.jpg"
   */
  display_url: string;
  /**
   * Width in px, without unit.
   *
   * E.g: "1280"
   */
  width: string;
  /**
   * Height in px, without unit.
   *
   * E.g: "720"
   */
  height: string;
  /**
   * Image size in bytes.
   *
   * E.g: 2104762 (around 2mb)
   */
  size: number;
  /**
   * Timestamp image was first uploaded.
   *
   * E.g: "1660866578"
   */
  time: string;
  /**
   * Timestamp image will be expirated. If it's not during upload, it'll be "0" (not expiring).
   *
   * E.g: "1660866578"
   */
  expiration: string;
  /**
   * Full sized image details.
   */
  image: ImageBBImage;
  /**
   * Thumbnail sized image details.
   */
  thumb: ImageBBImage;
  /**
   * Medium sized image details.
   */
  medium?: ImageBBImage;
  /**
   * Link that allows deleting an image (requires authentication).
   *
   * E.g: "https://i.ibb.co/nzpq9LJ/80f6dccc6366304564d685a23acd43734.jpg"
   */
  delete_url: string;
}
