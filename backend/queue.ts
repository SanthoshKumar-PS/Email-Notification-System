import {Queue} from 'bullmq'
import connection from './connection'

const queue = new Queue('email-queue',{connection})

export default queue;