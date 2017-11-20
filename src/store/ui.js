import { observable } from 'mobx';

class Ui {
  @observable isQuerying;

  constructor () {
    this.isQuerying = false;
  }
}

export {Ui}
