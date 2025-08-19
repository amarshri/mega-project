import conf from '../conf/conf.js';
import {Client,Account,ID} from "appwrite";

export class Authservice{
    Client = new Client();
    account;

    constructor(){
        this.Client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProid);
        this.account = new Account(this.Client);
    }

    async createAccount({email,password,name}){
        try {
           const userAccount = await this.account.create(ID.unique(),email,password,name);
           if (userAccount) {
            return this.login({email,password})
           }else{
            return userAccount;
           }
        } catch (error) { 
            throw error;
        }  
    }
    async login ({email,password}){
        try {
           return await this.account.createEmailSession(email,password)
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