import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { USER } from '../models/firestoreModel';
import { COLORS } from '../assets/themes/colors';

const useStyles = makeStyles({
    container: {
        maxHeight: '80vh',
        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    },
    tableHeadBgColor: {
        backgroundColor: `${COLORS.White}`,
    },
    tableRowHover: {
        '&:hover': {
            boxShadow: '0 2px 6px 0 rgba(0,0,0,0.2)',
            backgroundColor: `${COLORS.White} !important`,
        },
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
                            <TableCell
                                classes={{
                                    stickyHeader: classes.tableHeadBgColor,
                                }}
                            >
                                Name
                            </TableCell>
                            <TableCell
                                classes={{
                                    stickyHeader: classes.tableHeadBgColor,
                                }}
                            >
                                Email
                            </TableCell>
                            <TableCell
                                classes={{
                                    stickyHeader: classes.tableHeadBgColor,
                                }}
                            >
                                Role
                            </TableCell>
                            <TableCell
                                classes={{
                                    stickyHeader: classes.tableHeadBgColor,
                                }}
                            >
                                Recent Activity
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataBody.map((row, index) => (
                            <TableRow
                                hover
                                key={index}
                                classes={{
                                    hover: classes.tableRowHover,
                                }}
                            >
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
