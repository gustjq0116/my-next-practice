import { NextApiRequest, NextApiResponse} from 'next'
import sqlite from 'sqlite'
import { PersonInfo } from '../../../api/VehiclePerson'
import { hash } from 'bcrypt'

export default async function Signup(req: NextApiRequest, res: NextApiResponse)
{
    const db = await sqlite.open('./mymydatabase')

    if(req.method === 'POST')
    {

        // hash(req.body.password, 10, async function(err, hash) {
        //         // Store hash in your password DB.
            

        //     const statement = await db.prepare(
        //         'INSERT INTO person (name, email, password) values (?, ?, ?)'
        //         )
        //     const result = await statement.run(
        //         req.body.name, 
        //         req.body.email, 
        //         hash
        //         )
        //     result.finalize();

        //     const people: PersonInfo[] = await db.all('SELECT * from Person')

        //     res.json(people)
        //     //Promise.resolve()
        // });


        const hashResult = await hash(req.body.password, 10)
        .catch(err =>res.status(400).json({ message: "hashing failed" }))
        .then(hash => hash)
        
            // Store hash in your password DB.
        
        if(hashResult)
        {
            const statement = await db.prepare(
                'INSERT INTO person (name, email, password) values (?, ?, ?)'
                )
            const result = await statement.run(
                req.body.name, 
                req.body.email, 
                hashResult
                )
            result.finalize();

            const people: PersonInfo[] = await db.all('SELECT * from Person')

            res.json(people)
        }
        //Promise.resolve()
    

    }
    else
    {
        res.status(405).json({ message: 'We only support POST'})
       // Promise.resolve()
    }
    //return Promise.resolve()



   
}