import { Mail_Constant } from '../constant/Mail.constant.js';
import { createTransport } from '../utils/SendMail.js';
import dotenv from 'dotenv';
dotenv.config();

export let Send_Mail_Controller = async (req, res) => {
  try {
    let { subject, message, Select_template, recipientEmail } = req.body;

    console.log(subject, Select_template, recipientEmail);

    // let MailSend_toUser = await createTransport().sendMail({
    //   from: `"MERN Coding School"  ${process.env.GMAIL_User}>`,
    //   to: `"Abhishek Gupta"  ${recipientEmail}`,
    //   subject: subject,
    //   text: message,
    //   // html: "<b>Hello world?</b>",
    // });

    if (!MailSend_toUser) {
      let error = new Error(Mail_Constant.EMAIL_NOT_SENT);
      error.status = 400;
      throw error;
    }

    // res.status(200).json({
    //   message: `Email sent successfully from ${SenderEmail} to ${recipientEmail}.`,
    //   messageId: MailSend_toUser.messageId,
    //   timestamp: new Date().toISOString(), // Optional: Current timestamp
    // });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
    });
  }
};
