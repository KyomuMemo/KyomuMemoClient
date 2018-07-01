import axios from "axios";

const url = "http://localhost:2000/";
class FusenAPIClient {
  static async sendFusenCreateRequest(accountID, fusenID) {
    try {
      const result = await axios.get(
        url + "memo/" + accountID + "/" + fusenID + "/create"
      );
      return { result: "ok", fusen: result.data };
    } catch (e) {
      if (e.reponse !== undefined) {
        return Object.assign({ result: "ng" }, { content: e.response.data });
      } else {
        return { result: "ng", message: "system error" };
      }
    }
  }

  static async sendFusenUpdateRequest(accountID, fusenData) {
    try {
      const result = await axios({
        method: "post",
        url: url + "memo/" + accountID + "/" + fusenData.fusenID + "/update",
        data: JSON.stringify(fusenData),
        
      });
      return { result: "ok", fusen: result.data };
    } catch (e) {
      if (e.reponse !== undefined) {
        return Object.assign({ result: "ng" }, e.response.data);
      } else {
        return { result: "ng", message: "system error" };
      }
    }
  }

  static async sendFusenDeleteRequest(accountID, fusenID) {
    try {
      await axios.get(url + "memo/" + accountID + "/" + fusenID + "/delete");
      return { result: "ok" };
    } catch (e) {
      if (e.reponse !== undefined) {
        return Object.assign({ result: "ng" }, e.response.data);
      } else {
        return { result: "ng", message: "system error" };
      }
    }
  }
  static async sendFusenGetRequest(accountID, fusenID) {
    try {
      const result = await axios.get(
        url + "memo/" + accountID + "/" + fusenID + "/get"
      );
      return { result: "ok", fusens: result.data };
    } catch (e) {
      if (e.reponse !== undefined) {
        return Object.assign({ result: "ng" }, e.response.data);
      } else {
        return { result: "ng", message: "system error" };
      }
    }
  }
}

export default FusenAPIClient;
