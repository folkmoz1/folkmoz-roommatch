import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const deleteImage = async (public_id: string) => {
  return await cloudinary.uploader.destroy(public_id, (err, result) => {
    if (err) throw err;

    return true;
  });
};

export { cloudinary, deleteImage };
