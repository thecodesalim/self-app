import { makeObservable, computed, observable, action } from "mobx";

class Store {
  value = "";
  selves = [];
  photos = [];

  constructor() {
    makeObservable(this, {
      value: observable,
      selves: observable,
      updateText: action,
      addSelf: action,
      addPhoto: action,
      getSelfCount: computed,
      getPhotoCount: computed
    });
  }
  updateText = (value) => {
    this.value = value;
  };
  addSelf = (text) => {
    this.selves.push(text);
    this.value = "";
  };
  addPhoto = uri => {
    this.photos.push(uri)
  }
  get getSelfCount() {
    return this.selves.length;
  }
  get getPhotoCount() {
    return this.photos.length;
  }
}

export default new Store();
