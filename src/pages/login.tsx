import { useRef, useState } from "react"


export default function login()
{
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [message, setmessage] = useState<any>(null)


    const handleLogin =  async () =>
    {
        const resp = await fetch('http://localhost:3000/api/login', 
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
        
        const json = await resp.json()
        setmessage(json)
    
        //console.log(emailRef.current?.value, passwordRef.current?.value)
    }

    return <div>
        <input type="text" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="********" ref={passwordRef} />
        <button onClick={handleLogin}>Login</button>
    </div>
}