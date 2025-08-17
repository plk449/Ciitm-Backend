import StatusCodeConstant from '../../../constant/StatusCode.constant.mjs';
import SendResponse from '../../../utils/SendResponse.mjs';
import RoleConstant from './Role.constant.mjs';
import RoleService from './Role.service.mjs';
import RoleUtils from './Role.utils.mjs';

class Role_Controller {
  Create_Admin_Role_Controller = async (req, res) => {
    try {
      let { email } = req.body;

      let find_Admin_Role = await RoleUtils.Find_Role(email);

      let Create_Admin = await RoleService.create_Admin_Role(email);

      SendResponse.success(
        res,
        StatusCodeConstant.CREATED,
        RoleConstant.ROLE_CREATED,
        Create_Admin
      );
    } catch (error) {
      console.log('error', error);
      SendResponse.error(
        res,
        500,
        error.message || RoleConstant.ROLE_NOT_CREATED
      );
    }
  };

  Get_All_Admin_Roles_Controller = async (req, res) => {
    try {
      let All_Admin_Roles = await RoleService.get_All_Admin_Roles();

      SendResponse.success(
        res,
        StatusCodeConstant.SUCCESS,
        RoleConstant.ALL_ADMIN_ROLES_FETCHED,
        All_Admin_Roles
      );
    } catch (error) {
      console.log('error', error);
      SendResponse.error(
        res,  
        StatusCodeConstant.NOT_FOUND,
        error.message || RoleConstant.ROLE_NOT_FETCHED
      );
    }
  };

  Delete_Admin_Role_Controller = async (req, res) => {
    try {
      let { email } = req.params;

      let Delete_Admin_Role = await RoleService.delete_Admin_Role(email);

      SendResponse.success(
        res,
        StatusCodeConstant.SUCCESS,
        RoleConstant.ROLE_DELETED,
        Delete_Admin_Role
      );
    } catch (error) {
      console.log('error', error);
      SendResponse.error(
        res,
        StatusCodeConstant.NOT_FOUND,
        error.message || RoleConstant.ROLE_NOT_DELETED
      );
    }
  };
}

export default new Role_Controller();
