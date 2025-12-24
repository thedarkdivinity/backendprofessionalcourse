import  {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config()
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

const uploadToCloudinary = async(localFilePath) =>{
    try {
        if(!localFilePath) return null;
        //upload to cloudinary
     const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: 'auto'
        })
        console.log("File uploaded to Cloudinary successfully ", response.url);
        fs.unlinkSync(localFilePath);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.error("Error uploading file to Cloudinary", error);
        return null;
    }
}
export {uploadToCloudinary};