import conf from '../conf/conf.js';
import {Client,Databases,Storage,Query,ID} from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProid);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({Title,slug,Content,Image,Status,userid}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDataid,
                conf.appwriteColid,
                slug,
                {
                    Title,
                    Content,
                    Image,
                    Status,
                    userid,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error ", error);
        }
    }

    async updatePost(slug, {Title,Content,Image,Status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDataid,
                conf.appwriteColid,
                slug,
                {
                    Title,
                    Content,
                    Image,
                    Status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error ", error);
        }
    }

    async deletePost (slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDataid,
                conf.appwriteColid,
                slug,
            ) 
            return true ;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error ", error);
            return false ; 
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDataid,
                conf.appwriteColid,
                slug,
            )
        } catch (error) {
             console.log("Appwrite service :: getPost :: error ", error);
             return false
        }
    }
    async getPosts(queries = [Query.equal("Status","active")] ){
        try {
            return await this.databases.listDocuments(
                 conf.appwriteDataid,
                conf.appwriteColid,
                queries,
            ) 
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error ", error);
             return false
        }
    }

    // file uplode services 

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucid,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucid,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucid,
            fileId
        )
    }

}

const service = new Service();
export default service