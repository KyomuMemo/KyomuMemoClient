import axios from "axios";
import { API_URL } from "../constant";

const url = API_URL;

class FusenAPIClient {
  static async sendFusenCreateRequest(accountID) {
    try {
      const result = await axios.post(
        url + "memo/create",
        JSON.stringify({ userID: accountID })
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

  static async sendFusenUpdateRequest(fusenData) {
    try {
      const result = await axios({
        method: "post",
        url: url + "memo/update",
        data: JSON.stringify(fusenData)
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
      await axios.post(
        url + "memo/delete",
        JSON.stringify({ userID: accountID, fusenID: fusenID })
      );
      return { result: "ok" };
    } catch (e) {
      if (e.reponse !== undefined) {
        return Object.assign({ result: "ng" }, e.response.data);
      } else {
        return { result: "ng", message: "system error" };
      }
    }
  }
  static async sendFusenGetRequest(accountID) {
    try {
      const result = await axios.post(
        url + "memo/get",
        JSON.stringify({ userID: accountID })
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
