import { createStyles, Fab, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { GridColumns, GridRowId, GridRowParams } from '@material-ui/data-grid';
import { CollectionDataType, COLLECTION_ID } from '../../models/firestoreModel';
import { getCollectionData } from '../../utils/firebase/firestore';
import { Add, Delete } from '@material-ui/icons';
import CustomDataGrid from '../../components/General/CustomDataGrid';
import { deleteFeedback } from '../../utils/feedbackFunctions';
import AddFeedbackDialog from '../../components/Feedback/AddFeedbackDialog';
import UpdateFeedbackDialog from '../../components/Feedback/UpdateFeedbackDialog';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tableWrapper: {
            marginTop: '1rem',
            marginBottom: '1rem',
            width: '100%',
            height: '84vh',
        },
        fabWrapper: {
            '& > *': {
                margin: theme.spacing(1),
            },
            bottom: theme.spacing(2),
            right: theme.spacing(2),
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column-reverse',
        },
    }),
);

const columns: GridColumns = [
    {
        field: 'uid',
        headerName: 'UID',
        type: 'string',
        width: 400,
    },
    {
        field: 'name',
        headerName: 'Name',
        type: 'string',
        width: 300,
    },
    {
        field: 'feedback',
        headerName: 'Feedback',
        type: 'string',
        width: 500,
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        type: 'string',
        width: 300,
    },
];

const Feedback: React.FC = () => {
    const classes = useStyles();

    const [feedbackData, setFeedbackData] = useState<CollectionDataType>([]);
    const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
    const [isUpdatePanelOpen, setIsUpdatePanelOpen] = useState(false);
    const [selectedRows, setSelectedRows] = React.useState<GridRowId[]>([]);
    const [clickedRow, setClickedRow] = useState<GridRowParams>();

    useEffect(() => {
        getCollectionData(COLLECTION_ID.FEEDBACK).then((data) => {
            console.log(data);
            setFeedbackData(data);
        });
    }, []);

    const deleteSelectedUsers = () => {
        // TODO: Add confirmation dialog

        deleteFeedback(selectedRows as Array<string>).then(() => {
            window.location.reload();
        });
    };

    console.log('feedback');

    return (
        <div id="feedback-dashboard">
            <div className={classes.tableWrapper}>
                <CustomDataGrid
                    columns={columns}
                    rows={feedbackData}
                    setSelectionModel={setSelectedRows}
                    selectionModel={selectedRows}
                    setUpdatePanelOpen={setIsUpdatePanelOpen}
                    setClickedRow={setClickedRow}
                />
            </div>

            <AddFeedbackDialog open={isAddPanelOpen} onClose={() => setIsAddPanelOpen(false)} />
            <UpdateFeedbackDialog
                open={isUpdatePanelOpen}
                onClose={() => setIsUpdatePanelOpen(false)}
                rowData={clickedRow?.row}
            />

            <div className={classes.fabWrapper}>
                <Fab color="primary" size="large" aria-label="add" onClick={() => setIsAddPanelOpen(true)}>
                    <Add />
                </Fab>

                <Fab color="secondary" size="medium" aria-label="add" onClick={deleteSelectedUsers}>
                    <Delete />
                </Fab>
            </div>
        </div>
    );
};

export default Feedback;
