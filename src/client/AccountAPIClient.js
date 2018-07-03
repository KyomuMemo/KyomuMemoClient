import axios from "axios";
import { API_URL } from "../constant";

const url = API_URL;

class AccountAPIClient {
  static async SendAccountCreateRequest(AccountName) {
    try {
      const result = await axios.post(
        url + "account/create",
        JSON.stringify({
          userName: AccountName
        })
      );
      return { result: "ok", userID: result.data["userID"] };
    } catch (e) {
      if (e.response !== undefined) {
        return Object.assign({ result: "ng" }, e.response.data);
      } else {
        return { result: "ng", message: e.toString() };
      }
    }
  }
  static async SendAccountLoginRequest(AccountName) {
    try {
      const result = await axios.post(
        url + "account/getid",
        JSON.stringify({
          userName: AccountName
        })
      );
      return { result: "ok", userID: result.data["userID"] };
    } catch (e) {
      if (e.response !== undefined) {
        return Object.assign({ result: "ng" }, e.response.data);
      } else {
        return { result: "ng", message: e.toString() };
      }
    }
  }
}
export default AccountAPIClient;
