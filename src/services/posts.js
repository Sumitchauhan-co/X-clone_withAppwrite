import config from "../config/config";
import { databases, storage, ID } from "./config";
import { Query } from "appwrite";

const DB_ID = config.appwriteDBId;
const POSTS_COLLECTION_ID = config.appwriteCollectionId;
const BUCKET_ID = config.appwriteBucketId;

export const uploadPostImage = async (file) => {
  const uploaded = await storage.createFile(BUCKET_ID, ID.unique(), file);

  console.log("services:posts.js ->", uploaded.$id);

  const previewUrl = storage.getFileView(BUCKET_ID, uploaded.$id);

  console.log("Preview url :", previewUrl);

  return {
    imageId: uploaded.$id,
    imageUrl: previewUrl,
  };
};

export const createPost = ({
  userId,
  username,
  content,
  imageId,
  imageUrl,
  mediaType,
}) => {
  // console.log(imageId, imageUrl);
  return databases.createDocument(DB_ID, POSTS_COLLECTION_ID, ID.unique(), {
    userId,
    username,
    content,
    createdAt: new Date().toISOString(),
    imageId: imageId,
    imageUrl: imageUrl,
    mediaType: mediaType,
  });
};

export const getPosts = () => {
  return databases.listDocuments(DB_ID, POSTS_COLLECTION_ID, [
    Query.orderDesc("createdAt"),
  ]);
};

export const getFileUrl = (fileId) => {
  // console.log("services:posts.js -> ", fileId);
  return storage.getFileView(BUCKET_ID, fileId).toString();
};
