import { Schema, model } from 'mongoose';

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      default: 'admin',
    },
  },
  { timestamps: true }
);

const Admin = model('Admin', AdminSchema);

export default Admin;
