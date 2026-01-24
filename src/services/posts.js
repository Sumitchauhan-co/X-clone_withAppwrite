import config from "../config/config";
import { databases, ID } from "./config";
import { Query } from "appwrite";

const DB_ID = config.appwriteDBId;
const POSTS_COLLECTION_ID = config.appwriteCollectionId;

export const createPost = ({ userId, username, content }) => {
  return databases.createDocument(
    DB_ID,
    POSTS_COLLECTION_ID,
    ID.unique(),
    {
      userId,
      username,
      content,
      createdAt: new Date().toISOString(),
    }
  );
};

export const getPosts = () => {
  return databases.listDocuments(
    DB_ID,
    POSTS_COLLECTION_ID,
    [Query.orderDesc("createdAt")]
  );
};
