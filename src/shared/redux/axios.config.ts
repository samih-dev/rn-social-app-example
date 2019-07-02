import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create({
    baseURL: 'http://10.0.0.16:3000/api/v1',
    responseType: 'json',
});

const middlewareConfig = {
    interceptors: {
        request: [
            function ({ getState, dispatch, getSourceAction }, req) {
                const { auth: { authToken } } = getState();
                if (authToken) {
                    req.headers.common['Authorization'] = authToken;
                }

                return req;
            },
        ]
    }
}
const rdxMiddleware = axiosMiddleware(client, middlewareConfig);
export default rdxMiddleware;



