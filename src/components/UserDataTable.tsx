import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { USER } from '../models/firestoreModel';

const useStyles = makeStyles({
    container: {
        maxHeight: '80vh',
    },
});

type DataTableProps = {
    dataBody: Array<USER>;
};

const DataTable: React.FC<DataTableProps> = ({ dataBody }: DataTableProps) => {
    const classes = useStyles();
    console.log(dataBody);

    return (
        <>
            <TableContainer component={Paper} className={classes.container}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Recent Activity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataBody.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.role}</TableCell>
                                <TableCell>{row.lastAccessed.toDate().toISOString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default DataTable;
// { dataHead, dataBody }: DataTableProps
