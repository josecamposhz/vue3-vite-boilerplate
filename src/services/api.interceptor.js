import credentialService from "./credential.service";

function request(config) {
  config.headers["Authorization"] = credentialService.getToken();
  return config;
}

function errorResponse(error) {
  let status = error.response.status;
  if (status === 401) logout();
  return Promise.reject(error);
}

function logout() {
  localStorage.clear();
  if (window.location.pathname !== "/auth/login") {
    location.reload();
  }
}

export { request, errorResponse };
