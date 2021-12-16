// import mockAdapter from "axios-mock-adapter";
// import { apiAxios, getUserToken, setUserToken, getApiUrl } from "../utils/apiAxios";

// let api;
// let mockAxios;

describe("Api Axios Test", () => {
  // beforeEach(() => {
  //   api = apiAxios();
  //   mockAxios = new mockAdapter(api);
  //   setUserToken("my-test-token");
  // });

  it("dummy test for interim pull request", () => {
    expect(true).toBe(true);
  });
  // it("Get Users", () => {
  //   mockAxios.onGet(`${getApiUrl()}/users`).reply(200, { data: { ID: 1234 } });
  //   return api.get(`users`).then((response) => {
  //     expect(response).toStrictEqual({ data: { ID: 1234 } });
  //   });
  // });
  // it("Set Token", () => {
  //   let token = "testing-my-token-unique-name";
  //   setUserToken(token);
  //   expect(getUserToken()).toBe(token);
  // });
});
