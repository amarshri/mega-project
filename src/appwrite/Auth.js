import conf from '../conf/conf.js';
import {Client,Account,ID} from "appwrite";

export class Authservice{
    Client = new Client();
    account;

    constructor(){
        this.Client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProid);
        this.Client = new Account(this.Client);
    }

    async createAccount({email,passward,name}){
        try {
           const userAccount = await this.account.create(ID.unique(),email,passward,name);
           if (userAccount) {
            return this.login({email,passward})
           }else{
            return userAccount;
           }
        } catch (error) {
            throw error;
        }
    }
    async login ({email,passward}){
        try {
           return await this.account.createEmailSession(email,passward)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }

async logout(){
    try {
        return await this.account.deleteSessions()
    } catch (error) {
        throw error;
    }
}


}

const authservice = new Authservice(); 

export default authservice;