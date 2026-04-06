import confi from "../confi/confi.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(confi.appwriteUrl)
      .setProject(confi.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // ✅ CREATE POST
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const response = await this.databases.createDocument(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        ID.unique(), // ✅ FIX: unique ID instead of slug
        {
          title,
          slug, // keep slug inside data
          content,
          featuredImage,
          status,
          userId,
        }
      );

      return response;
    } catch (error) {
      console.error("createPost error:", error.message);
      throw error; // ✅ better debugging
    }
  }

  // ✅ UPDATE POST
  async updatePost(documentId, { title, slug, content, featuredImage, status }) {
    try {
      const response = await this.databases.updateDocument(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        documentId, // ✅ FIX: use documentId (not slug)
        {
          title,
          slug,
          content,
          featuredImage,
          status,
        }
      );

      return response;
    } catch (error) {
      console.error("updatePost error:", error.message);
      throw error;
    }
  }

  // ✅ DELETE POST
  async deletePost(documentId) {
    try {
      await this.databases.deleteDocument(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        documentId // ✅ FIX
      );
      return true;
    } catch (error) {
      console.error("deletePost error:", error.message);
      return false;
    }
  }

  // ✅ GET SINGLE POST
  async getPost(documentId) {
    try {
      const response = await this.databases.getDocument(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        documentId // ✅ FIX
      );
      return response;
    } catch (error) {
      console.error("getPost error:", error.message);
      return null;
    }
  }

  // ✅ GET ALL POSTS
  async getPosts() {
    try {
      const response = await this.databases.listDocuments(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        [Query.equal("status", "active")]
      );
      return response;
    } catch (error) {
      console.error("getPosts error:", error.message);
      return null;
    }
  }

  // ✅ UPLOAD FILE
  async uploadFile(file) {
    try {
      const response = await this.bucket.createFile(
        confi.appwriteBucketId,
        ID.unique(),
        file
      );
      return response;
    } catch (error) {
      console.error("uploadFile error:", error.message);
      return null;
    }
  }

  // ✅ DELETE FILE
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(confi.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("deleteFile error:", error.message);
      return false;
    }
  }

  // ✅ FILE PREVIEW
  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(confi.appwriteBucketId, fileId);
    } catch (error) {
      console.error("getFilePreview error:", error.message);
      return null;
    }
  }
}

const service = new Service();
export default service;