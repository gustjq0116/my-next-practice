import { verify } from 'crypto';
import { NextApiHandler, NextApiRequest, NextApiResponse} from 'next'
import sqlite from 'sqlite'
import jwt from 'jsonwebtoken'
import { secret } from '../../../api/secret';
import { PersonInfo } from '../../../api/VehiclePerson'


export const auth = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    

    //console.log(req.cookies)
    
    if(!req.cookies.auth) return res.status(401).json({ message: "Not Allowed"})

  //   const result = await jwt.verify(req.cookies.auth, secret)
  //  // console.log(result)
  //   if(result) return await fn(req, res)

    await jwt.verify(req.cookies.auth, secret, async (err, decoded) =>
    {
     // try{
     //   if(err) return res.status(401).json({ message: "Not Allowed"})
      if(err) return res.status(401).json({ message: "Not Allowed"})
        await fn(req, res)
     // }
     // catch{
     //   return res.status(401).json({ message: "Not Allowed"})
     // }
    })

  // return await fn(req, res)    
}


export default auth(async function getPeople(req: NextApiRequest, res: NextApiResponse)
{
    const db = await sqlite.open('./mymydatabase')
    const people: PersonInfo[] = await db.all('SELECT id, email, name from Person')
   // console.log(people)
    if(people) return res.json(people)
    else return res.json({ message: 'no people'})
    
})