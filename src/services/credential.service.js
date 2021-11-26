class CredentialService {
  getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  getToken() {
    return localStorage.getItem("token") || "";
  }
}

export default new CredentialService();
