import RoleConstant from './Role.constant.mjs';
import Admin_Role from './Role.model.mjs';

class Role_Service {
  create_Admin_Role = async (email) => {
    try {
      const Create_Admin = await Admin_Role.create({
        email: email,
      });

      if (!Create_Admin) {
        throw Error(RoleConstant.ROLE_NOT_CREATED);
      }

      return Create_Admin;
    } catch (error) {
      throw new Error(error.message || 'Failed to create Admin Role');
    }
  };

  get_All_Admin_Roles = async () => {
    try {
      const All_Admin_Roles = await Admin_Role.find();

      if (!All_Admin_Roles || All_Admin_Roles.length === 0) {
        throw Error(RoleConstant.ROLE_NOT_FETCHED);
      }

      return All_Admin_Roles;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch all Admin Roles');
    }
  };

  delete_Admin_Role = async (email) => {
    try {
      const Delete_Admin_Role = await Admin_Role.findOneAndDelete({
        email: email,
      });
      if (!Delete_Admin_Role) {
        throw Error(RoleConstant.ROLE_NOT_DELETED);
      }
      return Delete_Admin_Role;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete Admin Role');
    }
  };


}
export default new Role_Service();
