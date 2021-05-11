import { makeObservable, action, observable } from "mobx"

class UserStore {
  @observable terms = false
  @observable age = false
  @observable screenCapture  =  ""

  constructor() {
    makeObservable(this)
  }

  @action setScreenCapture(string) {
    this.screenCapture = string
  }

  @action setTerms(bool) {
    this.terms = bool
  }

  @action setAge(bool) {
    this.age = bool
  }
}

export default new UserStore()
