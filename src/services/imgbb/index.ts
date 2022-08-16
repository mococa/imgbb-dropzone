/* ---------- External ---------- */
import axios from 'axios';

/* ---------- Types ---------- */
import { ImgBBService } from '../../@types';

/* ---------- Constants ---------- */
const IMAGEBB_ENDPOINT = 'https://api.imgbb.com/1';

/* ---------- APIs ---------- */
const api = axios.create({
  baseURL: IMAGEBB_ENDPOINT,
});

/**
 *
 * @param {string} api_key - description: ImageBB API Key
 * @param {File} image - description: Image binary
 * @param {ImgBBService.UploadOptions} options - description: ImageBB optional options
 * @returns {ImgBBService.UploadOutput} image_info - description: Data containing uploaded imagedetails
 */
export const imgbb_upload_service = ({
  api_key,
  image,
  options,
  onUploadUpdate,
}: ImgBBService.UploadInput) => {
  const form = new FormData();
  form.append('image', image);

  return api.post<ImgBBService.UploadOutput>('/upload', form, {
    params: {
      ...(options || {}),
      key: api_key,
    },
    onUploadProgress:
      onUploadUpdate &&
      ((progress: { loaded: number }) => {
        const percentage = Math.round((progress.loaded * 100) / image.size);

        return onUploadUpdate(percentage > 100 ? 100 : percentage);
      }),
  });
};
