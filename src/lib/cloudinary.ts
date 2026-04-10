import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export async function uploadImage(file: string, folder: string = "ekodine") {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    transformation: [
      { width: 800, height: 600, crop: "fill", quality: "auto" },
    ],
  });
  return result.secure_url;
}
