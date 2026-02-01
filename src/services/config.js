import config from "../config/config.js";
import { Account, Client, ID, Databases, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint(config.appwriteEndpoint)
  .setProject(config.appwriteProjectId);

export const account = new Account(client);

export const databases = new Databases(client);

export const storage = new Storage(client)

export default client;
export { ID, Databases, };
