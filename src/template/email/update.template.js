import { createTransport } from '../../utils/SendMail.js';
import dotenv from 'dotenv';
dotenv.config();

// find_Student.student.email[0]
const Update_Status_template = async ({
  firstName,
  lastName,
  message,
  uniqueId,
  email,
}) => {
  let sendMail = await createTransport().sendMail({
    from: `"MERN Coding School"  ${process.env.GMAIL_User}>`,
    to: `${firstName}  ${email}`,
    // subject: subject,
    // text: message,
    html: `
          <div style="padding: 1.5vw 1.5vw;">
  
      <div style="flex: 1; text-align: center; width: 100%;">
        <img src="http://res.cloudinary.com/dpnc8ddpf/image/upload/v1733037028/japasey8rxmxes20zkrm.jpg" alt="Profile Image" style="border-radius: 50%; width: 100px; height: 100px;">
        <h4  style="margin-top: 10px; font-size: 1.1vw;">Abhishek Gupta</h4>
        <h4 style="margin-top: -10px; font-size: 1.2vw; margin-top: -28px;">Backend Developer</h4>
       </div>
   
      <div style="flex: 2; text-align: left; padding-left: 20px; margin-top: 44px;">
        <h3 style="color: red; font-size: 1vw;">😍 Dear ${firstName}  ${lastName},</h3>
        <p style="font-size: 1.2vw; font-family: 'Times New Roman', Times, serif;  margin-top: 2vh;">
            💬 ${message} 💬
        </p>
        <p style="font-size: 0.9vw; font-family: 'Times New Roman', Times, serif; margin-top: 2vh;">
            🔑 Your unique Institute ID is: ${uniqueId}.
        </p>
    </div>
   
   
   
   <h4 style="text-align: right; width: 100%; font-size: 0.7vw;">Thanks</h4>
   <h4 style="text-align: right; width: 100%; font-size: 0.7vw;">Abhishek Gupta</h4>
   <h4 style="text-align: right; width: 100%; font-size: 0.7vw;">Backend Developer</h4>
   <a href="mailto:merncodingschool@gmail.com" style="float: right; text-align: right; width: 100%; font-size: 0.7vw;">Mern Coding School</a>
  </div>
  
      `,
  });

  return sendMail;
};

export default Update_Status_template;
