import axios from "axios";

const url = "http://localhost:2000/";

class AccountAPIClient {
  static async SendAccountCreateRequest(AccountName) {
    try {
      const result = await axios.get(
        url + "account/" + AccountName + "/create"
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
      const result = await axios.get(
        url + "account/" + AccountName + "/getid"
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
