import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";

import Config from "react-native-config";

console.log(`############### ${Config.SERVER_BASE}`);

const client = axios.create({
  baseURL: Config.SERVER_BASE,
  responseType: "json"
});

const middlewareConfig = {
  interceptors: {
    request: [
      function({ getState, dispatch, getSourceAction }, req) {
        const {
          auth: { authToken }
        } = getState();
        if (authToken) {
          req.headers.common["Authorization"] = authToken;
        }

        return req;
      }
    ]
  }
};
const rdxMiddleware = axiosMiddleware(client, middlewareConfig);
export default rdxMiddleware;
