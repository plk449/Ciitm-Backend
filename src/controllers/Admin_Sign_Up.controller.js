import AuthenticationSchema from '../models/AuthenticationSchema.model.js';
import Admin_Role from '../models/Admin_Role.model.js';
import { uploadOnCloudinary } from '../utils/Cloudinary.js';

export let SignUp_Admin = async (req, res) => {
  try {
    const { name, email, password, confirm_Password } = req.body;
    let { filename } = req.file;

    if (!filename) {
      return res
        .status(400)
        .json({ message: 'Please upload a profile picture' });
    }

    let Authentication_Instance = new AuthenticationSchema();

    let HashEmail = await Authentication_Instance.hashEmail(email);

    let find_Admin = await AuthenticationSchema.findOne({ email: email });

    if (find_Admin) {
      res.cookie('token', HashEmail);
      return res.status(400).json({
        message: 'Admin already exists',
        find_Admin,
        token: HashEmail,
      });
    }

    if (password !== confirm_Password) {
      return res
        .status(400)
        .json({ message: 'Password and Confirm Password do not match' });
    }

    let HashPassword = await Authentication_Instance.hashPassword(password);

    if (!HashEmail && !HashPassword) {
      return res
        .status(400)
        .json({ message: 'Fail to Hash Email and Password' });
    }

    let Cloudinary = await uploadOnCloudinary(`${filename}`, filename);

    if (!Cloudinary) {
      return res.status(400).json({ message: 'Error uploading image' });
    }

    let Find_Admin_Role = await Admin_Role.findOne({ email: email });

    if (!Find_Admin_Role) {
      return res
        .status(403)
        .json({ message: 'You are Not Verify to become Admin' });
    }

    let CreatedUser = await AuthenticationSchema.create({
      provider_Name: name,
      name: name,
      email: email,
      email_verified: true,
      password: HashPassword,
      picture: Cloudinary.url,
      role: 'admin',
    });

    res.cookie('token', HashEmail);

    return res.status(200).json({
      message: 'Admin created successfully',
      CreatedUser,
      token: HashEmail,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || 'Error creating admin', error });
  }
};
