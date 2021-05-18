import cloudinary from "cloudinary";
import {
	API_KEY,
	API_SECRET,
	CLOUD_NAME,
} from "../constants/EnvironmentConstants";

cloudinary.v2.config({
	cloud_name: CLOUD_NAME,
	api_key: API_KEY,
	api_secret: API_SECRET,
});

const cloudinaryService = cloudinary.v2;

export default cloudinaryService;
