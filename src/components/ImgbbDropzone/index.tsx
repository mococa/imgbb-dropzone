/* ---------- External ---------- */
import React, { useRef } from 'react';

/* ---------- Types ---------- */
import { ImgBBService } from '../../@types';

/* ---------- Contexts ---------- */
import { useImgbb } from '../../context/ImgbbContext';

/* ---------- Services ---------- */
import { imgbb_upload_service } from '../../services/imgbb';

/* ---------- Interfaces ---------- */
interface Props {
  /**
   * Function triggered when mouse is dragging a file and it's over dropdown
   */
  onDragIn?: React.DragEventHandler<HTMLDivElement>;
  /**
   * Function triggered when mouse is dragging a file and it's **NOT** over dropdown anymore
   */
  onDragOut?: React.DragEventHandler<HTMLDivElement>;
  /**
   * Function triggered each time the upload progress updates
   */
  onUploadProgress?: (percentage: number | null) => void;
  /**
   * Function triggered when upload finishes, returning back its results
   */
  onUploadFinished?: (data: ImgBBService.UploadOutput) => void;
  /**
   * ImgBB Upload options
   */
  upload_options?: Partial<ImgBBService.UploadOptions>;
  /**
   * Image allowed types.
   *
   * E.g: ["image/png", "image/jpeg", "image/gif"]
   */
  allowed_types?: string[];
  /**
   * Dropzone body
   */
  children?: React.ReactNode;
}

export const ImgbbDropzone = ({
  onDragIn,
  onDragOut,
  onUploadProgress,
  onUploadFinished,
  upload_options,
  allowed_types = ['image/png', 'image/jpeg'],
  children,
}: Props) => {
  /* ---------- Refs ---------- */
  const input_ref = useRef<HTMLInputElement>(null);

  /* ---------- Hooks ---------- */
  const { imgbb_api_key } = useImgbb();

  /* ---------- Handlers ---------- */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const image_type = e.dataTransfer.items[0]?.type || '';

    if (!allowed_types.includes(image_type)) return;

    if (onDragIn) onDragIn(e);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (onDragOut) onDragOut(e);
  };

  const handleUpload = async (file: File) => {
    if (!input_ref.current) return;

    try {
      input_ref.current.disabled = true;

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

    input_ref.current.disabled = false;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

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
      onDragOver={handleDragOver}
      onDragExit={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleDropzoneClick}
    >
      <input
        style={{ display: 'none' }}
        type="file"
        ref={input_ref}
        disabled={input_ref.current?.disabled}
        onChange={async ({ target }) => {
          if (!input_ref.current) return;

          if (target.files?.length) {
            await handleUpload(target.files[0]);
          } else {
            input_ref.current.disabled = false;
          }
        }}
        accept={allowed_types.join(',')}
      />

      {children}
    </div>
  );
};
