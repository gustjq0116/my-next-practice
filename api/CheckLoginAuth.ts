import { GetServerSidePropsContext } from "next";

export const checkLoginAuth = async (url: string, context: GetServerSidePropsContext) =>
{
    //console.log(context)
    const cookie = context.req?.headers.cookie

    const resp = await fetch(url, {
        headers: {
            cookie: cookie!
        }
    })
    if(resp.status === 401 && context.req) //Server Side
    {
        //console.log("bbbb")
        context.res.writeHead(302, {
            Location: 'http://localhost:3000/login'
        })
        context.res.end();
        return {};
    }
    else
    {
        const json: any = await resp.json()
        return json
    }
    
    
}