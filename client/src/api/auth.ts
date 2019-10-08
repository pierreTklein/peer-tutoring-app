import { AxiosPromise, AxiosResponse } from "axios";
import { APIRoute, IAccount } from "../config";
import LocalCache from "../util/LocalCache";
import API from "./api";
import APIResponse from "./APIResponse";

class AuthAPI {
  constructor() {
    API.createEntity(APIRoute.AUTH_LOGIN);
    API.createEntity(APIRoute.AUTH_LOGOUT);
    API.createEntity(APIRoute.AUTH_FORGOT_PASS);
    API.createEntity(APIRoute.AUTH_RESET_PASS);
    API.createEntity(APIRoute.AUTH_CHANGE_PASS);
  }
  /**
   * Logs in a user to the API.
   * @param {String} email
   * @param {String} password
   */
  public async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<APIResponse<IAccount>>> {
    const result: AxiosResponse<APIResponse<IAccount>> = await API.getEndpoint(
      APIRoute.AUTH_LOGIN
    ).create({ email, password });
    return result;
  }
  /**
   * Logs out a user from the API
   * @returns {AxiosPromise<AxiosResponse>} a promise which resolves to a response
   */
  public async logout(): Promise<AxiosResponse<APIResponse<IAccount>>> {
    const result = await API.getEndpoint(APIRoute.AUTH_LOGOUT).getOne({
      id: ""
    });
    LocalCache.removeAll();
    return result;
  }
  /**
   * Sends a request for a reset-password email.
   * @param {string} email
   */
  public forgotPassword(email: string): AxiosPromise {
    return API.getEndpoint(APIRoute.AUTH_FORGOT_PASS).create({ email });
  }
  /**
   * Reset a password given an authentication token (provided by API in email).
   * @param {string} password
   * @param {string} authToken
   */
  public async resetPassword(
    password: string,
    authToken: string
  ): Promise<AxiosResponse<APIResponse<{}>>> {
    const config = {
      headers: {
        "x-reset-token": authToken
      }
    };
    const result = await API.getEndpoint(APIRoute.AUTH_RESET_PASS).create(
      { password },
      { config }
    );
    LocalCache.removeAll();
    return result;
  }

  /**
   * Change the password of the logged in user from an old password to a new password.
   * @param {string} oldPassword The current password of the user
   * @param {string} newPassword The new password of the user
   */
  public changePassword(
    oldPassword: string,
    newPassword: string
  ): AxiosPromise {
    const changePasswordObject = {
      oldPassword,
      newPassword
    };
    return API.getEndpoint(APIRoute.AUTH_CHANGE_PASS).patch(
      { id: "" },
      changePasswordObject
    );
  }
}
export const Auth = new AuthAPI();
export default Auth;
