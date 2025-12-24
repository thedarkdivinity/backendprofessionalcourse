import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/loggerUtil.js";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation - not empty
  //check if user already exists: username,email
  //check for images,check for avatar
  //upload them to cloudinary, avatar is required
  //create user Object - create entry in DB
  //remove password and refreshtoken from response
  // check for user creation
  //return response
  const { username, fullName, email, password } = req.body;
  logger.warn(`Registering user: ${username}, ${email}`);
  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await User.findOne({
    $or: [
      { username: username.trim().toLowerCase() },
      { email: email.trim().toLowerCase() },
    ],
  });
  if (existingUser) {
    throw new ApiError(409, "User with provided username/email already exists");
  }
  const avatarLocalPath = req.files?.avatar?.[0].path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar image is required");
  }
  const avatar = await uploadToCloudinary(avatarLocalPath);
  const coverImage = await uploadToCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(500, "Error uploading avatar image");
  }
    const user = await User.create({
        username: username.trim().toLowerCase(),
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        avatar: avatar.url,
        coverImage: coverImage?.url || '',
    });
    const createdUser = await User.findById(user._id).select('-password -refreshToken');
    if (!createdUser) {
        throw new ApiError(500, "Error creating user");
    }
    return res.status(201).json(
        new ApiResponse(201,createdUser,"User registered successfully")
    )

});
export { registerUser };
