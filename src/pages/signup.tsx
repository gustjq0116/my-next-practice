import { useRef, useState } from "react"


export default function Signup()
{
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [message, setmessage] = useState<any>(null)


    const handleLogin =  async () =>
    {
        const resp: Response = await fetch('http://localhost:3000/api/signup', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            })
        })
        
        const json: Object = await resp.json()
        setmessage(json)
        //Promise.resolve();
    }

    return <div>
        <h1>Create a user</h1>
        {console.log(JSON.stringify(message))}
        <input type="text" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="********" ref={passwordRef} />
        <button onClick={handleLogin}>Sign Up</button>
    </div>
}