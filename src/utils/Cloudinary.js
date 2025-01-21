import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
(async function () {
  // Configuration
  cloudinary.config({
    cloud_name: 'dpnc8ddpf',
    api_key: '926491768555756',
    api_secret: 'heTbaqllBERsv43lGnWai5rYRcQ', // Click 'View API Keys' above to copy your API secret
  });
})();

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    let localFileName = path.basename(localFilePath);

    if (!localFilePath) {
      return { error: 'No file path provided' };
    }

    const uploadResult = await cloudinary.uploader
      .upload(`public/upload/${path.basename(localFilePath)}`, {
        public_id: localFileName,
        resource_type: 'auto',
      })
      .catch((error) => {
        throw Error(error.message);
      });

    fs.renameSync(
      `public/upload/${localFilePath}`,
      `public/upload/${uploadResult.public_id}`
    );

    let ImageDetail = {
      url: uploadResult.url,
      public_id: uploadResult.public_id,
      format: uploadResult.format,
      original_filename: uploadResult.original_filename,
    };

    return ImageDetail;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    throw Error(error.message);
  }
};

export const Delete_From_Cloudinary = async (url) => {
  try {
    let public_id = path.basename(url).split('.')[0] + path.extname(url);

    let delete_Image = await cloudinary.uploader.destroy(public_id);
    console.log('delete_Image', delete_Image);

    if (delete_Image.result === 'ok') {
      fs.rmSync(`public/upload/${public_id}`);

      let delete_Image_Detail = {
        message: `Image Deleted From Cloudinary ${public_id}`,
        public_id: public_id,
        deleted: true,
      };

      return delete_Image_Detail;
    }

    let failed_Delete_Image = {
      message: 'Error Deleting Image',
      deleted: false,
    };

    return failed_Delete_Image;
  } catch (error) {
    let Error_Detail = {
      public_id: `Error Deleting Image ${public_id}`,
      message: error.message,
      status: error.status,
      error: true,
    };
    throw Error_Detail;
  }
};
