import mongoose from 'mongoose';
const { Schema } = mongoose;

const contactSchool_Schema = new Schema({
  socialMedia: {
    facebook: {
      type: String,
      trim: true,
    },
    instagram: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    youtube: {
      type: String,
      trim: true,
    },
  },
  email: {
    generalInquiries: {
      type: String,
      required: true,
      trim: true,
    },
    admissions: {
      type: String,
      trim: true,
    },
    support: {
      type: String,
      trim: true,
    },
  },
  phoneNumbers: {
    mainOffice: {
      type: String,
      trim: true,
    },
    admissionsOffice: {
      type: String,
      trim: true,
    },
    supportDesk: {
      type: String,
      trim: true,
    },
  },
  physicalAddress: {
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zipCode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  additionalPlatforms: {
    whatsapp: {
      type: String,
      trim: true,
    },
  },
});

const Contact = mongoose.model('Contact', contactSchool_Schema);

export default Contact;
