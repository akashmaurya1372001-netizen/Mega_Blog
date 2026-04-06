import confi from "../confi/confi.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(confi.appwriteUrl)
      .setProject(confi.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // ✅ Create Account
  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      return user;
    } catch (error) {
      console.log("Create Account Error:", error);
    }
  }

  // ✅ Login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(
        email,
        password
      );
    } catch (error) {
      console.log("Login Error:", error);
    }
  }

  // ✅ Get Current User
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Get User Error:", error);
      return null;
    }
  }

  // ✅ Logout
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Logout Error:", error);
    }
  }
}

// ✅ Export instance (IMPORTANT)
const authService = new AuthService();
export default authService;