import { Account, Client } from "appwrite";

const client = new Client()

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6963d04e00397e3ed962')

export const account = new Account(client)

export default client