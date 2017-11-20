import { observable } from 'mobx';

class Vault {
  @observable isTokenVerified;

  constructor () {
    this.isTokenVerified = false;
  }
}

export { Vault };
