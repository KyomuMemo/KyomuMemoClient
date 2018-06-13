class APIMock {
  static getAllFusen(userID) {
    let fusenArray = [];
    for (let i = 0; i < 10; i++) {
      const fusenData = {
        userID: userID,
        fusenID: i,
        title: `title${i}`,
        tag: ['tag1', 'tag2'],
        text: `テキストテキストテキスト${i}`,
        color: 'ffffff'
      };
      fusenArray.push(fusenData);
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 1) resolve(fusenArray); //確率で成功
        else reject();
      }, 100);
    });
  }

  static createFusen(userID) {
    const fusen = {
      'userID': userID,
      'fusenID': 100 + Math.floor(Math.random() * 100), //めんどいのでIDはランダム
      'title': ``,
      'tag': [],
      'text': ``,
      'color': 'ffffff'
    };

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 1) resolve(fusen); //確率で成功
        else reject();
      }, 100);
    });
  }

  static deleteFusen(userID, fusenID) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 1) resolve(); //確率で成功
        else reject();
      }, 100);
    });
  }
}

export default APIMock;