import React from 'react';
import { DataGrid, GridRowsProp, GridToolbar, GridColumns, GridRowId, GridRowParams } from '@material-ui/data-grid';
import { createStyles, makeStyles } from '@material-ui/core';
import { CollectionDataType } from '../../models/firestoreModel';

const useStyles = makeStyles(() =>
    createStyles({
        dataGridRoot: {
            '& .MuiDataGrid-iconSeparator': {
                display: 'none',
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

    const handleRowClick = (row: GridRowParams) => {
        setClickedRow(row);
        setUpdatePanelOpen(true);
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
