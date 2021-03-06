import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
import { APIRoute, CACHE_USER_KEY, IAccount, IInviteInfo } from "../config";
import LocalCache from "../util/LocalCache";
import API from "./api";
import APIResponse from "./APIResponse";

class AccountAPI {
  constructor() {
    API.createEntity(APIRoute.ACCOUNT);
    API.createEntity(APIRoute.ACCOUNT_SELF);
    API.createEntity(APIRoute.ACCOUNT_INVITE);
    API.createEntity(APIRoute.ACCOUNT_CONFIRM);
    API.createEntity(APIRoute.ACCOUNT_CONFIRM_RESEND);
  }
  /**
   * Create an account.
   * @param account The account that you want to create
   * @param authToken If there is an authentication token associated with the account creation, then provide it here.
   */
  public async create(
    account: IAccount,
    authToken?: string
  ): Promise<AxiosResponse<APIResponse<IAccount>>> {
    let config: AxiosRequestConfig = {};
    if (authToken) {
      config = {
        headers: {
          token: authToken
        }
      };
    }
    const value = await API.getEndpoint(APIRoute.ACCOUNT).create(account, {
      config
    });
    LocalCache.set(CACHE_USER_KEY, value);
    return value;
  }
  /**
   * Get the logged-in user's information.
   */
  public async getSelf(
    expandCourse?: boolean,
    overrideCache?: boolean
  ): Promise<AxiosResponse<APIResponse<IAccount>>> {
    const cached: any = LocalCache.get(
      `${CACHE_USER_KEY}_${expandCourse || ""}`
    );
    if (cached && !overrideCache) {
      return cached as AxiosResponse<APIResponse<IAccount>>;
    }
    const value = await API.getEndpoint(APIRoute.ACCOUNT_SELF).getAll({
      params: { expandCourse: expandCourse }
    });
    LocalCache.set(`${CACHE_USER_KEY}_${expandCourse || ""}`, value);
    return value;
  }
  /**
   * Get information about a user
   * @param id the ID of the account
   */
  public async get(
    id: string,
    expandCourse?: boolean,
    overrideCache?: boolean
  ): Promise<AxiosResponse<APIResponse<IAccount>>> {
    const key = CACHE_USER_KEY + "-" + id;
    const cached: any = LocalCache.get(key);
    if (cached && !overrideCache) {
      return cached as AxiosResponse<APIResponse<IAccount>>;
    }
    const value = await API.getEndpoint(APIRoute.ACCOUNT).getOne(
      { id },
      {
        params: { expandCourse }
      }
    );
    LocalCache.set(key, value);
    return value;
  }
  /**
   * Update an account. In the future, we might want to relax the attributes being passed in
   * so that it's not the entirety of the Account object.
   * @param {IAccount} account
   */
  public async updateSelf(
    account: IAccount
  ): Promise<AxiosResponse<APIResponse<IAccount>>> {
    const value = await API.getEndpoint(APIRoute.ACCOUNT).patch(
      { id: "" },
      account
    );
    LocalCache.removeAll();
    return value;
  }
  /**
   * Update an account. In the future, we might want to relax the attributes being passed in
   * so that it's not the entirety of the Account object.
   * @param {IAccount} account
   */
  public async update(
    id: string,
    account: IAccount
  ): Promise<AxiosResponse<APIResponse<IAccount>>> {
    const value = await API.getEndpoint(APIRoute.ACCOUNT).patch(
      { id },
      account
    );
    LocalCache.removeAll();
    return value;
  }

  /**
   * Invites a user to create an account with the specified accountType.
   * @param {{email: string, accountType: string}} info
   */
  public invite(info: IInviteInfo): AxiosPromise<APIResponse<{}>> {
    return API.getEndpoint(APIRoute.ACCOUNT_INVITE).create(info);
  }

  /**
   * Confirms a user.
   * @param {string} token
   */
  public async confirm(token: string): Promise<AxiosResponse<APIResponse<{}>>> {
    const config = {
      headers: {
        "x-conf-token": token
      }
    };
    const result = await API.getEndpoint(APIRoute.ACCOUNT_CONFIRM).patch(
      { id: "" },
      {},
      config
    );
    LocalCache.removeAll();
    return result;
  }

  /**
   * Resends confirmation email
   */
  public resendConfirm(): AxiosPromise<APIResponse<{}>> {
    const result = API.getEndpoint(APIRoute.ACCOUNT_CONFIRM_RESEND).create({});
    LocalCache.removeAll();
    return result;
  }
}
export const Account = new AccountAPI();
export default Account;
