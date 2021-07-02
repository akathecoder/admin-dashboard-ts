import React, { useEffect, useState } from 'react';
import { DataGrid, GridRowsProp, GridToolbar, GridColumns, GridRowId, GridRowParams } from '@material-ui/data-grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { CollectionDataType, userRoleTypes } from '../../models/firestoreModel';
import { firebaseAuth } from '../../utils/firebase/firebase';
import { getUserRole } from '../../utils/generalFunctions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dataGridRoot: {
            border: 0,
            backgroundColor: theme.palette.type === 'light' ? '#ffffff' : '#1d1d1d',
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',

            color: theme.palette.type === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
            '& .MuiDataGrid-columnsContainer': {
                backgroundColor: theme.palette.type === 'light' ? '#ffffff' : '#1d1d1d',
                fontWeight: 500,
                fontSize: 13,
            },
            '& .MuiDataGrid-columnHeader': {},
            '& .MuiDataGrid-toolbar': {
                backgroundColor: theme.palette.type === 'light' ? '#ffffff' : '#1d1d1d',
            },
            '& .MuiDataGrid-iconSeparator': {
                display: 'none',
            },
            // Vertical Borders
            // '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
            //     borderRight: `1px solid ${theme.palette.type === 'light' ? '#f0f0f0' : '#303030'}`,
            // },
            '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
                borderBottom: `1px solid ${theme.palette.type === 'light' ? '#f0f0f0' : '#303030'}`,
            },
            '& .MuiDataGrid-cell': {
                color: theme.palette.type === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
            },
            '& .MuiDataGrid-row': {
                backgroundColor: theme.palette.type === 'light' ? '#ffffff' : '#1d1d1d',
            },
        },
    }),
);

interface CustomDataGridProps {
    columns: GridColumns;
    rows: CollectionDataType;
    setSelectionModel: React.Dispatch<React.SetStateAction<GridRowId[]>>;
    selectionModel: GridRowId[];
    setClickedRow: React.Dispatch<React.SetStateAction<GridRowParams | undefined>>;
    setUpdatePanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomDataGrid: React.FC<CustomDataGridProps> = ({
    columns,
    rows,
    setSelectionModel,
    selectionModel,
    setClickedRow,
    setUpdatePanelOpen,
}: CustomDataGridProps) => {
    const classes = useStyles();

    const [userRole, setUserRole] = useState<string>('');

    const user = firebaseAuth.currentUser;
    console.log(user);

    useEffect(() => {
        if (user) {
            getUserRole(user?.uid).then((data) => {
                setUserRole(data);
            });
        }
    }, [user]);

    const handleRowClick = (row: GridRowParams) => {
        if (userRole === userRoleTypes.ADMIN) {
            setClickedRow(row);
            setUpdatePanelOpen(true);
        }
    };

    return (
        <DataGrid
            className={classes.dataGridRoot}
            columns={columns}
            rows={rows as GridRowsProp}
            components={{
                Toolbar: GridToolbar,
            }}
            checkboxSelection
            onSelectionModelChange={(newSelection) => {
                setSelectionModel(newSelection.selectionModel);
            }}
            selectionModel={selectionModel}
            hideFooter={true}
            disableSelectionOnClick
            onRowClick={handleRowClick}
        />
    );
};

export default CustomDataGrid;
