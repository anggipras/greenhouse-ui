import clientConfig from "@/client.config";

const url = (path: string) => {
  return clientConfig.serverBaseUrl + path;
};

const API = {
  v1: {
    get jobs() {
      return url("/v1/jobs");
    },
    get candidatesApp() {
      return url("/v1/applications");
    },
    appSubmit(candId: number) {
      return url(`/v1/candidates/${candId}/applications`);
    },
  },
};

export default API;
