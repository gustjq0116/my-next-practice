const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

async function setup()
{

    const db = await sqlite.open('./MIC_database')
    await db.migrate({ force: true })
    const microphone = await db.all('SELECT * from microphone')
    console.log('All People ', JSON.stringify(microphone, null, 2))

    








    // //console.log("dd")
    // const db = await sqlite.open('./mymydatabase').catch(console.log)
    // await db.migrate({ force: true })
    // const people = await db.all('SELECT * from Person')
    // console.log('All People ', JSON.stringify(people, null, 2))

    // const vehicle = await db.all('SELECT * from Vehicle')
    // console.log('All Vehicle ', JSON.stringify(vehicle, null, 2))

}

setup();