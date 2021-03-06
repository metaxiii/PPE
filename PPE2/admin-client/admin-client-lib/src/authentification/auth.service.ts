import { Admin } from 'm2l-core';

import { INavigationAuthAccess } from '../navigation';
import { ILoginAuthAccess } from '../login-state';
import { ILogoutAuthAccess } from '../logout-state';

import { IAuthGateway } from '.';

export class AuthService implements INavigationAuthAccess, ILoginAuthAccess, ILogoutAuthAccess {
  private _gateway: IAuthGateway;
  private _user: Admin;
  private _hash: (val: string) => string;

  constructor(config: {
    gateway: IAuthGateway,
    hash: (val: string) => string
  }) {
    this._gateway = config.gateway;
    this._hash = config.hash;
  }

  get user(): Admin {
    return this._user;
  }

  get userID(): number {
    return this._user.id;
  }

  public login(credentials: { mail: string, password: string }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      credentials.password = this._hash(credentials.password);
      this._gateway.login(credentials)
        .then(user => {
          this._user = user;
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    })
  }

  public logout(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._gateway.logout(this._user.id)
        .then(res => {
          this._user = undefined;
          resolve(true);
        })
        .catch(err => reject(err));
    })
  }

  public userIsConnected(): boolean {
    return this._user != null;
  }
}
