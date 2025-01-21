import joi from 'joi';

let Social_Link_Validator = joi.object({
  // linkedin, facebook, instagram, email, Number
  linkedin: joi.string().required().uri().messages({
    'string.base': `Linkedin should be a type of 'text'`,
    'string.empty': `Linkedin cannot be an empty field`,
    'any.required': `Linkedin is a required field`,
  }),
});

export default Social_Link_Validator;
