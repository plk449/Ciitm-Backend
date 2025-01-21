import Joi from 'joi';

let AlbumSchemaJoi = Joi.object({
  albumName: Joi.string().required().messages({
    'string.empty': 'Image Name is empty',
    'string.base': 'Image Name must be a string',
    'any.required': 'Image Name is required',
  }),

  albumImageUrl: Joi.string().trim().required().messages({
    'string.empty': 'Album Image Url In Required',
    'any.required': 'Album Image Url In Required',
  }),

  Public_Id: Joi.string()
    .trim()
    .required()
    .pattern(
      /^[a-zA-Z0-9_-]{1,}$|^[a-fA-F0-9]{24}$|^[a-zA-Z0-9_-]+\.(png|jpg|jpeg|gif|bmp|webp|tiff)$/
    )
    .message({
      'string.empty': 'Public ID is required',
      'any.required': 'Public ID is required',
      'string.pattern.base':
        'Public ID must be a valid Cloudinary public ID (letters, numbers, hyphens, and underscores only)',
    }),

  albumDescription: Joi.string().min(5).max(225).required().messages({
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 5 characters',
    'string.max': 'Description must be at most 255 characters',
    'any.required': 'Description is required',
  }),
});

export default AlbumSchemaJoi;
