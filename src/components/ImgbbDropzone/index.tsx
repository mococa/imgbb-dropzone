/* ---------- External ---------- */
import React, { useRef } from 'react';

/* ---------- Types ---------- */
import { ImgBBService } from '../../@types';

/* ---------- Services ---------- */
import { imgbb_upload_service } from '../../services/imgbb';

/* ---------- Styles ---------- */
import './style.cjs.development.css';

/* ---------- Interfaces ---------- */
interface Props {
  /**
   * Function triggered when mouse is dragging a file and it's over dropdown
   */
  onDragOver?: () => void;
  /**
   * Function triggered each time the upload progress updates
   */
  onUploadProgress?: (percentage: number | null) => void;
  /**
   * Function triggered when upload finishes, returning back its results
   */
  onUploadFinished?: (data: ImgBBService.UploadOutput) => void;
  /**
   * ImgBB API Key
   */
  imgbb_api_key: string;
  /**
   * ImgBB Upload options
   */
  upload_options?: Partial<ImgBBService.UploadOptions>;
  /**
   * Image allowed types.
   * E.g: ["image/png", "image/jpeg", "image/gif"]
   */
  allowed_types?: string[];
  /**
   * Dropzone body
   */
  children?: React.ReactNode;
}

export const ImgbbDropzone = ({
  onDragOver,
  onUploadProgress,
  onUploadFinished,
  imgbb_api_key,
  upload_options,
  allowed_types = ['image/png', 'image/jpeg'],
  children,
}: Props) => {
  /* ---------- Refs ---------- */
  const input_ref = useRef<HTMLInputElement>(null);

  /* ---------- Handlers ---------- */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const image_type = e.dataTransfer.items[0]?.type || '';

    if (!allowed_types.includes(image_type)) return;

    if (onDragOver) onDragOver();
  };

  const handleUpload = async (file: File) => {
    try {
      const { data } = await imgbb_upload_service({
        api_key: imgbb_api_key,
        options: upload_options,
        image: file,
        onUploadUpdate: onUploadProgress,
      });

      if (onUploadFinished) onUploadFinished(data);
    } catch (error) {
      console.error(error);
    }

    if (onUploadProgress) onUploadProgress(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!input_ref) return;
    if (!input_ref.current) return;

    if (input_ref.current.disabled) return;

    const data_files = e.dataTransfer?.files || [];
    const data_file = data_files[0];

    if (!data_file) return;

    (async () => {
      if (!data_file.type) return;
      if (!input_ref.current) return;

      if (allowed_types.includes(data_file.type)) {
        await handleUpload(data_file);
      }
    })();
  };

  const handleDropzoneClick = () => {
    if (!input_ref.current || input_ref.current.disabled) return;

    if (input_ref.current.click) input_ref.current.click();
  };

  return (
    <div
      className="imgbb_dropzone"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleDropzoneClick}
      aria-disabled={input_ref.current?.disabled}
    >
      <input
        type="file"
        ref={input_ref}
        disabled={input_ref.current?.disabled}
        onChange={({ target }) => {
          if (!input_ref.current) return;

          if (target.files?.length) {
            Object.assign(input_ref.current, { disabled: true });

            handleUpload(target.files[0]);
          }
        }}
        accept={allowed_types.join(',')}
      />

      {children}
    </div>
  );
};
