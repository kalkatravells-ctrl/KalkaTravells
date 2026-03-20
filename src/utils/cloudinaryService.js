import axios from "axios";

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.REACT_APP_CLOUDINARY_API_KEY;

// Upload image to Cloudinary (without authentication - unsigned upload)
export const uploadImageToCloudinary = async (file, folder) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kalka_travels"); // Isko Cloudinary dashboard me set karna
    formData.append("folder", `kalka_travels/${folder}`);

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log("Upload successful:", response.data.secure_url);
        return {
            url: response.data.secure_url,
            publicId: response.data.public_id,
            width: response.data.width,
            height: response.data.height,
        };
    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        throw new Error(error.response?.data?.error?.message || "Upload failed");
    }
};

// Delete image from Cloudinary (requires backend API call)
export const deleteImageFromCloudinary = async (publicId) => {
    try {
        // Backend API call karega jo Cloudinary delete API ko call karega
        // For now, sirf logs denge
        console.log("Delete request for:", publicId);

        // Future: Backend se call karega
        // await axios.post('/api/delete-image', { publicId });

        return true;
    } catch (error) {
        console.error("Delete failed:", error);
        throw error;
    }
};

// Image optimization URL generator
export const getOptimizedCloudinaryUrl = (url, width = 400, height = 300) => {
    if (!url) return null;

    // Extract public ID from URL
    const urlParts = url.split("/");
    const publicId = urlParts.slice(-1)[0].split(".")[0];
    const cloudName = CLOUD_NAME;

    // Construct optimized URL with transformations
    return `https://res.cloudinary.com/${cloudName}/image/fetch/w_${width},h_${height},c_fill,q_auto,f_auto/${url}`;
};
