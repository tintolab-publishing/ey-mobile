import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        /* uat */
        // clientId: "a5ad4968-c5bb-4a5f-b7eb-06141bdd62d8",
        // redirectUri: 'https://m-koreaportal-uat.eyua.net',

        /*prod */
        clientId: "be16b225-efdc-4d4b-9a3b-cc56da88c152",
        redirectUri: 'https://m-koreaportal.ey.net',

        authority: "https://login.microsoftonline.com/eygs.onmicrosoft.com",
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
};

export const loginRequest = {
    scopes: ["User.Read"]
};
