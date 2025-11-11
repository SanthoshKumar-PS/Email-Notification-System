import dotenv from 'dotenv';
dotenv.config();

if(!process.env.UPSTASH_REDIS_URL){
    throw new Error("Environmental variables doesn't have UPSTASH_REDIS_URL")
}

const connection = {
    url:process.env.UPSTASH_REDIS_URL
}

export default connection;