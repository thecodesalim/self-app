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
      getSelfCount: computed,
    });
  }
  updateText = (value) => {
    console.log(value);
    this.value = value;
  };
  addSelf = (text) => {
    this.selves = this.selves.concat(text);
    this.value = "";
  };
  get getSelfCount() {
    console.log("getSelfCount");
    return this.selves.length;
  }
}

export default new Store();
