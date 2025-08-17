import { Router } from 'express';
import RoleController from './Role.controller.mjs';
import AuthMiddleware from '../../../middleware/Auth.middleware.mjs';

const routes = Router();

routes.post(
  '/v1/role/create',
  AuthMiddleware.Admin,
  RoleController.Create_Admin_Role_Controller
);
routes.get(
  '/api/v1/role/admins',
  AuthMiddleware.Admin,
  RoleController.Get_All_Admin_Roles_Controller
);
routes.delete(
  '/api/v1/role/admin/:email',
  AuthMiddleware.Admin,
  RoleController.Delete_Admin_Role_Controller
);

export { routes as RoleRouter };
