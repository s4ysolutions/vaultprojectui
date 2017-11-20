import { useStrict } from 'mobx';
import { Vault } from './domain/vault';
import { Ui } from './ui';

useStrict(true);
class RootStore {
  constructor () {
    this.vault = new Vault();
    this.ui = new Ui();
  }
}

const rootStore = new RootStore();
export default rootStore;
