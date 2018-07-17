import axios from "axios";
import { API_URL } from "../constant";

const url = API_URL;

class FusenAPIClient {
  /**
   * M6.1 付箋作成処理
   * 付箋の作成リクエストを送信する
   * @param {string} accountID アカウントID
   * @return {Object} 成功/失敗，成功時は付箋データ 失敗時はエラーメッセージ
   */
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

  /**
   * M6.2 付箋更新処理
   * 付箋の更新リクエストを送信する
   * @param {Object} fusenData 更新する付箋のデータ
   * @return {Object} 成功/失敗，成功時は付箋データ 失敗時はエラーメッセージ
   */
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

  /**
   * M6.3 付箋削除処理
   * 付箋の削除リクエストを送信する
   * @param {string} accountID アカウントID
   * @param {string} fusenID 削除する付箋のID
   * @return {Object} 成功/失敗，失敗時はエラーメッセージ
   */
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

  /**
   * M3.1 付箋要求処理
   * 付箋の取得リクエストを送信する
   * @param {string} accountID アカウントID
   * @return {Object} 成功/失敗，全付箋が格納された配列
   */
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
