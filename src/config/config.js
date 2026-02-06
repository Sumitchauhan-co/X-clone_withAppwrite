const config = {
  appwriteEndpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDBId: String(import.meta.env.VITE_APPWRITE_DB_ID),
  appwriteCollectionIdPosts: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID_POSTS,
  ),
  appwriteCollectionIdPostLikes: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID_POST_LIKES,
  ),
  appwriteCollectionIdPostComments: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID_POST_COMMENTS,
  ),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default config;
