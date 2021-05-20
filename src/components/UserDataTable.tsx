import {
    Checkbox,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import React from 'react';
import { USER } from '../models/firestoreModel';
import { COLORS } from '../assets/themes/colors';
import fromnow from 'fromnow';

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
    CellColorTableGray: {
        color: COLORS.TableGray,
        fontWeight: 400,
        fontSize: 13,
    },
    CellColorTableBlack: {
        color: COLORS.TableBlack,
        fontWeight: 500,
        fontSize: 15,
    },
    tableHeadCellHead: {
        color: COLORS.TableGray,
        fontWeight: 500,
        fontSize: 13,
    },
    tableHeadCellSizeSmall: {
        paddingTop: '10px',
        paddingBottom: '10px',
    },
    tableCellPaddingCheckBox: {
        paddingRight: '4px',
    },
});

type DataTableProps = {
    dataBody: Array<USER>;
    selectedUsers: Array<string>;
    setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
};

const DataTable: React.FC<DataTableProps> = ({ dataBody, selectedUsers, setSelectedUsers }: DataTableProps) => {
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
                                    head: classes.tableHeadCellHead,
                                    sizeSmall: classes.tableHeadCellSizeSmall,
                                }}
                                size="small"
                                padding="checkbox"
                            >
                                {/* <Checkbox disabled size="small" /> */}
                            </TableCell>
                            <TableCell
                                classes={{
                                    stickyHeader: classes.tableHeadBgColor,
                                    head: classes.tableHeadCellHead,
                                    sizeSmall: classes.tableHeadCellSizeSmall,
                                }}
                                size="small"
                            >
                                Name
                            </TableCell>
                            <TableCell
                                classes={{
                                    stickyHeader: classes.tableHeadBgColor,
                                    head: classes.tableHeadCellHead,
                                    sizeSmall: classes.tableHeadCellSizeSmall,
                                }}
                                size="small"
                            >
                                Email
                            </TableCell>
                            <TableCell
                                classes={{
                                    stickyHeader: classes.tableHeadBgColor,
                                    head: classes.tableHeadCellHead,
                                    sizeSmall: classes.tableHeadCellSizeSmall,
                                }}
                                size="small"
                            >
                                Role
                            </TableCell>
                            <TableCell
                                classes={{
                                    stickyHeader: classes.tableHeadBgColor,
                                    head: classes.tableHeadCellHead,
                                    sizeSmall: classes.tableHeadCellSizeSmall,
                                }}
                                size="small"
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
                                <TableCell
                                    padding="checkbox"
                                    classes={{
                                        paddingCheckbox: classes.tableCellPaddingCheckBox,
                                    }}
                                >
                                    <Checkbox
                                        size="small"
                                        color="primary"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedUsers([...selectedUsers, row.id!]);
                                            } else {
                                                setSelectedUsers(selectedUsers.filter((id) => id !== row.id));
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell
                                    classes={{
                                        body: classes.CellColorTableBlack,
                                    }}
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell
                                    classes={{
                                        body: classes.CellColorTableGray,
                                    }}
                                >
                                    {row.email}
                                </TableCell>
                                <TableCell
                                    classes={{
                                        body: classes.CellColorTableGray,
                                    }}
                                >
                                    {row.role}
                                </TableCell>
                                <TableCell
                                    classes={{
                                        body: classes.CellColorTableGray,
                                    }}
                                >
                                    {fromnow(row.lastAccessed.toDate(), {
                                        max: 1,
                                        suffix: true,
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default DataTable;
