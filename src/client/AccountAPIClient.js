import axios from "axios";

const url = "http://localhost:2000/";

class AccountAPIClient {
  static async SendAccountCreateRequest(AccountName) {
    try {
      const result = await axios.get(
        url + "account/ " + AccountName + "/create"
      );
      return result.data["userID"];
    } catch (e) {
      if (e.response != undefined) {
        return e.response.data;
      } else {
        return { message: e.toString() };
      }
    }
  }
  static async SendAccountLoginRequest(AccountName) {
    try {
      const result = await axios.get(
        url + "account/ " + AccountName + "/getid"
      );
      return result.data["userID"];
    } catch (e) {
      if (e.response != undefined) {
        return e.response.data;
      } else {
        return { message: e.toString() };
      }
    }
  }
}
export default AccountAPIClient;
