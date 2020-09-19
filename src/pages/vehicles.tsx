import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { VehicleInfo } from '../../api/VehiclePerson'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { checkLoginAuth } from '../../api/CheckLoginAuth'


export default function vehicle({ list }: InferGetServerSidePropsType<typeof getServerSideProps>)
{
    return (
    <TableContainer component={Paper}>
        <Table aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Model</TableCell>
            <TableCell align="right">OwnerID</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {/* {console.log(list)} */}
            {list.map((row: VehicleInfo, index: number) => (
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                {row.id}
                </TableCell>
                <TableCell align="right">{row.brand}</TableCell>
                <TableCell align="right">{row.model}</TableCell>
                <TableCell align="right">{row.owerId}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
{
    //console.log(context.req.complete)
    const json: VehicleInfo[] = await checkLoginAuth('http://localhost:3000/api/vehicle', context)
    
    return { props:
    {
        list: json!
    }}
}