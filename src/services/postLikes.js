import config from "../config/config";
import { databases, ID } from "./config";
import { Query } from "appwrite";

const DB_ID = config.appwriteDBId;
const POST_LIKES_COLLECTION_ID = config.appwriteCollectionIdPostLikes;

export const likePost = (postId, userId) => {
  return databases.createDocument(
    DB_ID,
    POST_LIKES_COLLECTION_ID,
    ID.unique(),
    {
      postId,
      userId,
      createdAt: new Date().toISOString(),
    },
  );
};

export const unlikePost = async (postId, userId) => {
  const res = await databases.listDocuments(DB_ID, POST_LIKES_COLLECTION_ID, [
    Query.equal("postId", postId),
    Query.equal("userId", userId),
  ]);

  if (!res.documents.length) return;

  return databases.deleteDocument(
    DB_ID,
    POST_LIKES_COLLECTION_ID,
    res.documents[0].$id,
  );
};

export const getUserLikedPosts = async (userId) => {
  if (!userId) return [];

  const res = await databases.listDocuments(DB_ID, POST_LIKES_COLLECTION_ID, [
    Query.equal("userId", userId),
  ]);

  return res.documents.map((d) => d.postId);
};
