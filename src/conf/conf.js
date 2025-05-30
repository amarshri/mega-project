const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProid : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDataid : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteColid : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucid : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf