import { AuthenticationContext, adalFetch, withAdalLogin } from "react-adal";

export const adalConfig = {
  tenant: "7c9ba36e-cda7-402e-a443-f4b98f9e9223",
  clientId: "c1665004-a828-48ca-b709-7eda41ade1d2",
  endpoints: {
    api: "https://graph.microsoft.com" // <-- The Azure AD-protected API
  },
  redirectUri: "http://localhost:3000",
  cacheLocation: "localStorage"
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(
  authContext,
  adalConfig.endpoints.api
);

export const getToken = () => {
  return authContext.getCachedToken(authContext.config.clientId);
};
