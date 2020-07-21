class UserInfo {
  constructor({ profileNameSelector, profileJobSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
  }

  getUserInfo() {
    this._profileInfoObject = {};

    this._profileInfoObject.name = this._profileName.textContent;
    this._profileInfoObject.job = this._profileJob.textContent;

    return this._profileInfoObject;
  }

  setUserInfo(profileNewInfo) {
    this._profileName.textContent = profileNewInfo.name;
    this._profileJob.textContent = profileNewInfo.about;
  }
}

export { UserInfo };
