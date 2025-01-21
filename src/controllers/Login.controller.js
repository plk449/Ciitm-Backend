import AuthenticationSchema from '../models/AuthenticationSchema.model.js';
import Admin_Role from '../models/Admin_Role.model.js';
import { uploadOnCloudinary } from '../utils/Cloudinary.js';

export let Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let Authentication_Instance = new AuthenticationSchema();

    let HashEmail = await Authentication_Instance.hashEmail(email);
    console.log(HashEmail);

    let Find_User = await AuthenticationSchema.findOne({ email: email });

    if (!Find_User) {
      return res.status(400).json({ message: 'User not found' });
    }
    console.log(password, Find_User.password);

    let ComparePassword = await Authentication_Instance.comparePassword(
      password,
      Find_User.password
    );

    console.log(ComparePassword);

    if (!ComparePassword) {
      return res.status(400).json({ message: 'Invalid Password' });
    }

    res.cookie('token', HashEmail);

    return res.status(200).json({
      message: 'Logged in successfully',
      Find_User,
      token: HashEmail,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || 'Error logging in admin', error });
  }
};
