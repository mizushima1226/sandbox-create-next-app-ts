const mysql = require('mysql')
import dotenv from 'dotenv'

import { IDBConnection } from '../interfaces/database/IDBConnection'

export class MySqlConnection extends IDBConnection {
    private pool: any

    constructor(){
        super()
        dotenv.config()
        console.log(`
        
        =====================================

        start connect to mysql!!!!!!!!!!!!!!!

        =====================================
        
        `)
        this.pool = mysql.createPool({
            connectionLimit: 5,
            host: process.env.DB_HOST_DEV,
            user: process.env.DB_USER_DEV,
            password: process.env.DB_PASSWORD_DEV,
            database: process.env.DB_NAME,
            timezone: 'utc'
        })

        this.pool.getConnection((error: any, connection: any) => {
            if(error){
                if(error.code === 'PROTOCOL_CONNECTION_LOST'){
                    console.error('Database connection was closed')
                }
                if(error.code === 'ER_CON_COUNT_ERROR'){
                    console.error('Database has too many connections')
                }
                if(error.code === 'ECONNREFUSED'){
                    console.error('Database connection was refused')
                }
            }

            if(connection) {
                connection.release()
            }

            this.pool.query('SELECT 1 + 1 AS solution',  (error: any, results: any) => {
                if (error) {
                    console.error(error)
                    return;
                };
                console.log('The solution is: ', results[0].solution);
              });

            return
        })

        this.pool.on('connection', () => {
            console.log('mysql connection create')
        })

        this.pool.on('release', (connection: any) => {
            console.log(`Connection ${connection.threadId} released`)
        })
    }

    execute(query: string, params?: any): Promise<any>{
        if(params){
            return this.pool.query(query, params)
        }

        return new Promise((resolve, reject) => {
            this.pool.query(query, (error, results) => {
                if(error){
                    reject(error)
                    return
                }
                resolve(results)
                return
            })
        })
    }

}