import { Account } from "../api";
import _ from "lodash";

import { FrontendRoute, IAccount, UserType } from "../config";

export async function isLoggedIn(): Promise<boolean> {
  try {
    const userInfo = await getUserInfo();
    return Boolean(userInfo);
  } catch (error) {
    return false;
  }
}

export async function getUserInfo(): Promise<IAccount | null> {
  try {
    const response = await Account.getSelf();
    return response.data.data;
  } catch (error) {
    return null;
  }
}

export function isUserType(
  account: IAccount,
  type: UserType | UserType[]
): boolean {
  if (Array.isArray(type)) {
    return _.difference(type, account.accountType).length === 0;
  } else {
    return account.accountType.includes(type);
  }
}
