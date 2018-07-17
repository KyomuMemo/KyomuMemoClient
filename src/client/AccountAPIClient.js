import axios from "axios";
import { API_URL } from "../constant";

const url = API_URL;

class AccountAPIClient {
  /**
   *  M1.1 アカウント作成要求処理
   *  アカウントの新規作成リクエストを送信する
   *  @param {string} accountName アカウント名
   *  @return {Object} 成功/失敗，成功時はユーザID 失敗時はエラーメッセージ
   */
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

  /**
   *  M1.2 アカウントログイン要求処理
   *  アカウントのログインリクエストを送信する
   *  @param {string} accountName アカウント名
   *  @return {Object} 成功/失敗，成功時はユーザID 失敗時はエラーメッセージ
   */
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
