// gapi must be in the page, somehow.
const gapi = window.gapi;

export class GoogleAuth {
  constructor(opts) {
    this.clientId = opts.clientId;
    this.cacheGet =
      opts.cacheGet || (() => JSON.parse(window.localStorage.getItem('google-login-cache')));
    this.cacheSet =
      opts.cacheSet ||
      (obj => window.localStorage.setItem('google-login-cache', JSON.stringify(obj)));

    this.subscribers = [];

    // Initialize everything
    this.readyWait = null;
    this.ready = false;
    this.auth = null;
    this.user = null;
    this._init();
  }

  async _init() {
    this.readyWait = new Promise((resolve, reject) => {
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: this.clientId
        });

        this.ready = true;
        this.auth = gapi.auth2.getAuthInstance();

        this.user = this.auth.currentUser.get();
        this.auth.currentUser.listen(user => {
          this.user = user;
          const info = this.getInfo();
          this.subscribers.forEach(s => s(info));
          this.cacheSet(info);
        });

        resolve();
      });
    });
  }

  async signIn() {
    await this.readyWait;
    this.auth.signIn();
  }

  async signOut() {
    await this.readyWait;
    this.auth.signOut();
  }

  getInfo() {
    if (!this.ready) {
      // Return from cache
      return this.cacheGet();
    } else if (!this.user.isSignedIn()) {
      return null;
    } else {
      const user = this.auth.currentUser.get();
      const profile = user.getBasicProfile();
      const info = {
        email: profile.getEmail(),
        familyName: profile.getFamilyName(),
        givenName: profile.getGivenName(),
        id: profile.getId(),
        imageUrl: profile.getImageUrl(),
        name: profile.getName(),
        auth: user.getAuthResponse()
      };
      return info;
    }
  }

  async getCredentials() {
    const info = this.getInfo();
    if (info == null) {
      return null;
    }

    const authInfo = info.auth;
    if (authInfo.expires_at < new Date().getTime()) {
      // Refresh auth response
      await this.readyWait;
      return new Promise((resolve, reject) => {
        this.auth.currentUser
          .get()
          .reloadAuthResponse()
          .then(res => resolve(res), err => reject(err));
      });
    } else {
      // Return current auth
      return Promise.resolve(authInfo);
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter(e => e !== callback);
  }
}

export default GoogleAuth;
