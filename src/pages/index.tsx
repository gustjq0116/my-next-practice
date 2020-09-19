import { Microphone } from '../../model/Microphone'
import { Homepage } from '../containers/Homepage'
import {GetStaticProps } from 'next'
import { openDB } from '../openDB'
import Link from 'next/link'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export interface IndexProps
{
    microphone: Microphone[];
}


export default function Index({ microphone }: IndexProps)
{

    return <div>
        {microphone.map((microphone, i) => (
            <div key={i}>
                <Link href="/microphone/[id]" as={`/microphone/${microphone.id}`}>
                    <a>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                alt={microphone.model + ' ' + microphone.brand}
                                height="140"
                                image={microphone.imageUrl}
                                title={microphone.brand + ' ' + microphone.model}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {microphone.brand + ' ' + microphone.model}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                    across all continents except Antarctica
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </a>
                </Link>
            </div>
        ))}
    </div>

}

export const getStaticProps: GetStaticProps = async (ctx) =>
{
    const db = await openDB();
    const microphone: Microphone[] = await db.all('SELECT * from microphone')

    return { props:
    { microphone: microphone }}
}


//export default Homepage