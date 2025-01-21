import { OAuth2Client } from 'google-auth-library';
import AuthenticationSchema from '../models/AuthenticationSchema.model.js';
import AdmissionSchems from '../models/Admission.model.js';
// import { uploadOnCloudinary__Url } from '../utils/Cloudinary.js';
import dotenv from 'dotenv';
dotenv.config({
  path: '../../.env',
});
import jwt from 'jsonwebtoken';
import { uploadOnCloudinary } from '../utils/Cloudinary.js';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID ||
    '458973671107-qd3n0s6e1raf636h0akotaecuqu07q4n.apps.googleusercontent.com'
);

let HandleGoogle_Login = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        process.env.GOOGLE_CLIENT_ID ||
        '458973671107-qd3n0s6e1raf636h0akotaecuqu07q4n.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();
    const userId = payload['sub'];
    const userEmail = payload['email'];
    const email_verified = payload['email_verified'];
    const userName = payload['name'];
    const userImage = payload['picture'];
    const issue = payload['iss'];

    console.log(userEmail);

    let FindUser = await AuthenticationSchema.findOne({
      email: userEmail,
      provider_Name: 'google',
    });

    console.log(FindUser);

    if (FindUser) {
      const UserCookie = jwt.sign({ email: userEmail }, process.env.JWT_SECRET);
      if (UserCookie) {
        res.cookie('token', UserCookie);
        req.session.token = UserCookie;
      }
    }

    if (!FindUser) {
      // Create user if not found

      res
        .status(201)
        .json({ message: 'User Not Found', login: 'failed', registar: true });

      let CreatedUser = await AuthenticationSchema.create({
        provider_Name: 'google',
        providerId: userId, // Assuming providerId is the unique ID
        name: userName,
        email: userEmail,
        email_verified: email_verified,
        issue: issue,
        picture: userImage,
        provider_displayName: userName,
      });

      let FindStudent = await AdmissionSchems.findById(CreatedUser._id);

      const UserCookie = jwt.sign({ email: userEmail }, process.env.JWT_SECRET);

      // res.cookie('token', token,
      if (UserCookie) {
        res.cookie('token', UserCookie);
        req.session.token = UserCookie;
      }

      return res.status(201).json({ message: 'User Created Successfully' });
    }

    // If user exists, you can return the user information or handle it accordingly
    return res
      .status(200)
      .json({ message: 'User Already Exists', user: FindUser });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).send(error.message);
  }
};

export default HandleGoogle_Login;
