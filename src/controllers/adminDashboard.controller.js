import contactSchema from '../models/contact.model';

export let admin_DashBoard_Controller = (req, res, next) => {
  let find_Contact = contactSchema.find();
  console.log(find_Contact);
};
