import confi from "../confi/confi.js";
import { Client, ID, Databases, Storage, Query,  } from "appwrite";

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

  // CREATE POST
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        slug,
       { 
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("createPost error:", error);
    }
  }

  // UPDATE POST
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument({ID:ID.unique(),
       databaseId: confi.appwriteDatabaseId,
        collectionId:  confi.appwriteCollectionId,
       documentId: slug,
       data: {
          title,
          content,
          featuredImage,
          status,
        }
    });
    } catch (error) {
      console.log("updatePost error:", error);
    }
  }

  // DELETE POST
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("deletePost error:", error);
      return false;
    }
  }

  // GET SINGLE POST
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("getPost error:", error);
      return false;
    }
  }

  // GET ALL POSTS
  async getPosts() {
    try {
      return await this.databases.listDocuments(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        [Query.equal("status", "active")]
      );
    } catch (error) {
      console.log("getPosts error:", error);
      return false;
    }
  }

  // UPLOAD FILE
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        confi.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("uploadFile error:", error);
      return false;
    }
  }
}

const service = new Service();
export default service;