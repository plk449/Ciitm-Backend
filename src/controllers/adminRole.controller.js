import Admin_Role from '../models/Admin_Role.model.js';
import { createRole } from '../Service/admin.service.js';

export let Create_Admin_Role_Controller = async (req, res) => {
  try {
    let { email } = req.body;
    console.log(email);

    let find_Admin_Role = await Admin_Role.findOne({ email: email });

    if (find_Admin_Role) {
      return res.status(400).json({
        message: 'Admin Role already exist',
        find_Admin_Role,
      });
    }

    let Create_Admin = await createRole(email);

    if (!Create_Admin) {
      return res.status(400).json({ message: 'Failed to create Admin Role' });
    }

    return res.status(201).json({
      message: 'Admin Role Created Successfully',
      data: await Create_Admin,
      created: true,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || 'Failed to create Admin Role',
    });
  }
};

export let Delete_Admin_Role_Controller = (req, res) => {};
