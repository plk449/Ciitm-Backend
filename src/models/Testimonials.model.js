import { Schema, model } from 'mongoose';

const Testimonials_Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
    job_Role: {
      type: String,
      required: true,
    },

    star: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

let Testimonial = model('Testimonial', Testimonials_Schema);
export default Testimonial;
