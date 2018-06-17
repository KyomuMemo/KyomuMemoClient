class APIMock {
  static getAllFusen(userID) {
    if (this.fusens.length == 0) {
      let fusenArray = [];
      for (let i = 0; i < 10; i++) {
        const fusenData = {
          userID: userID,
          fusenID: i,
          title: `title${i}`,
          tag: ["tag1", "tag2"],
          text: `テキストテキストテキスト${i}`,
          color: "ffffff"
        };
        fusenArray.push(fusenData);
      }
      this.fusens = fusenArray;
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //確率で成功
        if (Math.random() < 1) resolve(this.fusens);
        else reject();
      }, 100);
    });
  }

  static getFusen(fusenID) {
    let fusen = this.fusens.find(v => v.fusenID == fusenID);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (fusen === undefined) {
          reject();
        } else {
          resolve(fusen);
        }
      });
    });
  }

  static createFusen(userID) {
    const fusen = {
      userID: userID,
      fusenID: 100 + Math.floor(Math.random() * 100), //めんどいのでIDはランダム
      title: ``,
      tag: [],
      text: ``,
      color: "ffffff"
    };
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.fusens.push(fusen);
        resolve(fusen);
      }, 100);
    });
  }

  static deleteFusen(userID, fusenID) {
    const i = this.fusens.findIndex(v => v.fusenID == fusenID);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (i == -1) {
          reject();
        } else {
          this.fusens.splice(i, 1);
          resolve();
        }
      }, 100);
    });
  }

  static updateFusen(fusen) {
    const i = this.fusens.findIndex(v => v.fusenID == fusen.fusenID);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (i == -1) {
          reject();
        } else {
          this.fusens[i] = fusen;
        }
      }, 100);
    });
  }
}

// ちょっと汚いけどMockだから許して
APIMock.fusens = [];

export default APIMock;
