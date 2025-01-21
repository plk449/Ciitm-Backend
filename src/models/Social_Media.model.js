import { Schema, model } from 'mongoose';

let SocialMedia_Schema = new Schema({
  linkedin: {
    type: String,
    require: true,
    trim: true,
  },
  facebook: {
    type: String,
    require: true,
    trim: true,
  },

  instagram: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  number: {
    type: Number,
    min: 0,
    max: 9999999999,
    require: true,
    trim: true,
  },
});

let socialMedia = model('socialMedia', SocialMedia_Schema);

export default socialMedia;
