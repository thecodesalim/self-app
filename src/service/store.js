import { makeObservable, computed, observable, action } from "mobx";

class Store {
  value = "";
  selves = [];

  constructor() {
    makeObservable(this, {
      value: observable,
      selves: observable,
      updateText: action,
      addSelf: action,
      getCount: computed,
    });
  }
  updateText = (value) => {
    this.value = value;
  };
  addSelf = (text) => {
    this.selves.push(text);
    this.value = "";
  };
  get getCount() {
    return this.selves.length;
  }
}

export default new Store();
