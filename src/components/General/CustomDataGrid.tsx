import React from 'react';
import {
    DataGrid,
    GridRowsProp,
    GridToolbar,
    GridColumns,
    GridEditCellPropsParams,
    GridRowId,
} from '@material-ui/data-grid';
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
    onEditCellChangeCommitted: (data: GridEditCellPropsParams) => void;
    setSelectionModel: React.Dispatch<React.SetStateAction<GridRowId[]>>;
    selectionModel: GridRowId[];
}

const CustomDataGrid: React.FC<CustomDataGridProps> = ({
    columns,
    rows,
    onEditCellChangeCommitted,
    setSelectionModel,
    selectionModel,
}: CustomDataGridProps) => {
    const classes = useStyles();

    return (
        <DataGrid
            className={classes.dataGridRoot}
            columns={columns}
            rows={rows as GridRowsProp}
            components={{
                Toolbar: GridToolbar,
            }}
            onEditCellChangeCommitted={onEditCellChangeCommitted}
            checkboxSelection
            onSelectionModelChange={(newSelection) => {
                setSelectionModel(newSelection.selectionModel);
            }}
            selectionModel={selectionModel}
            hideFooter={true}
        />
    );
};

export default CustomDataGrid;
