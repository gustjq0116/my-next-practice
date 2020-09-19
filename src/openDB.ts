import sqlite from 'sqlite'

export async function openDB() {



    return sqlite.open('./MIC_database')
}


