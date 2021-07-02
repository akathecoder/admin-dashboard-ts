import { createStyles, Fab, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { GridColumns, GridRowId, GridRowParams } from '@material-ui/data-grid';
import { CollectionDataType, COLLECTION_ID, userRoleTypes } from '../../models/firestoreModel';
import { getCollectionData } from '../../utils/firebase/firestore';
import { Add, Delete } from '@material-ui/icons';
import CustomDataGrid from '../../components/General/CustomDataGrid';
import { deleteReport } from '../../utils/reportFunctions';
import AddReportDialog from '../../components/Report/AddReportDialog';
import UpdateReportDialog from '../../components/Report/UpdateReportDialog';
import { getUserRole } from '../../utils/generalFunctions';
import { firebaseAuth } from '../../utils/firebase/firebase';

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
            // right: theme.spacing(2),
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column-reverse',
        },
    }),
);

const columns: GridColumns = [
    {
        field: 'createdAt',
        headerName: 'Created At',
        type: 'string',
        width: 300,
    },
    {
        field: 'reason',
        headerName: 'Reason',
        type: 'string',
        width: 400,
    },
    {
        field: 'reportingUserName',
        headerName: "Reporting User's Name",
        type: 'string',
        width: 300,
    },
    {
        field: 'isUserReported',
        headerName: 'Is User Reported',
        type: 'boolean',
        width: 300,
    },
    {
        field: 'reportedUserUid',
        headerName: 'Reported User UID',
        type: 'string',
        width: 300,
    },
    {
        field: 'reportedUserName',
        headerName: 'Reported User Name',
        type: 'string',
        width: 300,
    },
    {
        field: 'reportedPostId',
        headerName: 'Reported Post ID',
        type: 'string',
        width: 300,
    },
];

const Report: React.FC = () => {
    const classes = useStyles();

    const [reportData, setReportData] = useState<CollectionDataType>([]);
    const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
    const [isUpdatePanelOpen, setIsUpdatePanelOpen] = useState(false);
    const [selectedRows, setSelectedRows] = React.useState<GridRowId[]>([]);
    const [clickedRow, setClickedRow] = useState<GridRowParams>();
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

    useEffect(() => {
        getCollectionData(COLLECTION_ID.REPORT).then((data) => {
            console.log(data);
            setReportData(data);
        });
    }, []);

    const deleteSelectedUsers = () => {
        // TODO: Add confirmation dialog

        deleteReport(selectedRows as Array<string>).then(() => {
            window.location.reload();
        });
    };

    console.log('report');

    return (
        <div id="report-dashboard">
            <div className={classes.tableWrapper}>
                <CustomDataGrid
                    columns={columns}
                    rows={reportData}
                    setSelectionModel={setSelectedRows}
                    selectionModel={selectedRows}
                    setUpdatePanelOpen={setIsUpdatePanelOpen}
                    setClickedRow={setClickedRow}
                />
            </div>

            <AddReportDialog open={isAddPanelOpen} onClose={() => setIsAddPanelOpen(false)} />
            <UpdateReportDialog
                open={isUpdatePanelOpen}
                onClose={() => setIsUpdatePanelOpen(false)}
                rowData={clickedRow?.row}
            />

            {userRole === userRoleTypes.ADMIN && (
                <div className={classes.fabWrapper}>
                    <Fab color="primary" size="large" aria-label="add" onClick={() => setIsAddPanelOpen(true)}>
                        <Add />
                    </Fab>

                    <Fab color="secondary" size="medium" aria-label="add" onClick={deleteSelectedUsers}>
                        <Delete />
                    </Fab>
                </div>
            )}
        </div>
    );
};

export default Report;
