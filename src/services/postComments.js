import config from "../config/config";
import { databases, ID, Query } from "./config";

const DB_ID = config.appwriteDBId;
const COMMENTS_COLLECTION_ID = config.appwriteCollectionIdPostComments;

export const createComment = (postId, userId, username, content) => {
  return databases.createDocument(DB_ID, COMMENTS_COLLECTION_ID, ID.unique(), {
    postId,
    userId,
    username,
    content,
    createdAt: new Date().toISOString(),
  });
};

export const getPostComments = async (postId) => {
  const res = await databases.listDocuments(DB_ID, COMMENTS_COLLECTION_ID, [
    Query.equal("postId", postId),
  ]);

  return res.documents;
};

export const deleteComment = async (commentId) => {
  return databases.deleteDocument(DB_ID, COMMENTS_COLLECTION_ID, commentId);
};

