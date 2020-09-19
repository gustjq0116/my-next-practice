import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Microphone } from "../../../model/Microphone";
import { openDB } from "../../openDB";

export interface MicrophoneDetail extends Microphone {}


export default function microphone({ id, brand, model, price, imageUrl}: MicrophoneDetail)
{
    const router = useRouter();

    if( router.isFallback )
    {
        return <div>Loading.....</div>
    }

    return <div>
       
        <div>{id}</div>
        <div>{brand}</div>
        <div>{model}</div>
        <div>{price}</div>
        <div>{imageUrl}</div>
    </div>
}

export const getStaticProps: GetStaticProps<MicrophoneDetail> = async (ctx) =>
{
    const id = ctx.params?.id;
    const db = await openDB();
    const microphone: MicrophoneDetail = await db.get('select * from microphone where id = ?', +id!)
    return { props: microphone}
}
export const getStaticPaths: GetStaticPaths<{id: string}> = async () =>
{
    const db = await openDB();
    const microphone: MicrophoneDetail[] = await db.all('select * from microphone')

    const paths = microphone.map(a => 
        {
            return { params: { id: a.id.toString() }}
        })

    return {
        fallback: true,
        paths
    }

}