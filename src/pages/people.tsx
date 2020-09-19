import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { PersonInfo } from '../../api/VehiclePerson'
import Router from 'next/router'
import { checkLoginAuth } from '../../api/CheckLoginAuth'


export default function People({ list }: InferGetServerSidePropsType<typeof getServerSideProps>)
{
    //console.log("Client")

    return <div>
        {JSON.stringify(list)}
        {}
        </div>
}



export const getServerSideProps: GetServerSideProps = async (context) =>
{
    //console.log(context.req.complete)
    const json = await checkLoginAuth('http://localhost:3000/api/people', context)
    
    return { props:
    {
        list: json!
    }}
}

