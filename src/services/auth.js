import { ID, account } from "./config";

export const signup = ({ email, password, name }) => {
  return account.create({ userId: ID.unique(), email, password, name });
};

export const login = ({ email, password }) => {
  return account.createEmailPasswordSession({ email, password });
};

export const logout = () => {
  return account.deleteSession({ sessionId: "current" });
};

export const getUser = () => {
  return account.get();
};
