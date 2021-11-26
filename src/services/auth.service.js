import Api from "./api.service";

class AuthService extends Api {
  login(credentials) {
    return this.resource.post(`auth/login`, credentials);
  }

  register(credentials) {
    return this.resource.post(`auth/register`, credentials);
  }

  verifyEmail(payload) {
    return this.resource.post(`auth/verify-email`, payload);
  }

  updateProfile(profile, userId) {
    return this.resource.put(`auth/profile/${userId}`, profile);
  }

  updatePassword(payload, userId) {
    return this.resource.put(`auth/password/${userId}`, payload);
  }

  updateAvatar(file, userId) {
    return this.resource.post(`auth/avatar/${userId}`, file, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  forgotPassword(email) {
    return this.resource.post(`auth/forgot-password`, email);
  }

  resetPassword(payload) {
    return this.resource.post(`auth/reset-password`, payload);
  }
}

export default new AuthService("auth");
