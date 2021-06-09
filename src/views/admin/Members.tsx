import { createStyles, Fab, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { GridColumns, GridRowId, GridRowParams } from '@material-ui/data-grid';
import { CollectionDataType, COLLECTION_ID } from '../../models/firestoreModel';
import { getCollectionData } from '../../utils/firebase/firestore';
import { deleteMembers } from '../../utils/memberFunctions';
import { Add, Delete } from '@material-ui/icons';
import AddMemberDialog from '../../components/Member/AddMemberDialog';
import CustomDataGrid from '../../components/General/CustomDataGrid';
import UpdateMemberDialog from '../../components/Member/UpdateMemberDialog';

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
        field: 'phone',
        headerName: 'Phone No.',
        type: 'number',
        width: 200,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'gender',
        headerName: 'Gender',
        type: 'string',
        width: 200,
    },
    {
        field: 'email',
        headerName: 'Email ID',
        type: 'string',
        width: 300,
    },
    {
        field: 'college',
        headerName: 'College',
        type: 'string',
        width: 300,
    },
    {
        field: 'currentProfession',
        headerName: 'Current Profession',
        type: 'string',
        width: 300,
    },

    {
        field: 'yearOfPassing',
        headerName: 'Year Of Passing',
        type: 'number',
        width: 200,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'address',
        headerName: 'Address',
        type: 'string',
        width: 400,
    },
];

const Members: React.FC = () => {
    const classes = useStyles();

    const [membersData, setMembersData] = useState<CollectionDataType>([]);
    const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
    const [isUpdatePanelOpen, setIsUpdatePanelOpen] = useState(false);
    const [selectedRows, setSelectedRows] = React.useState<GridRowId[]>([]);
    const [clickedRow, setClickedRow] = useState<GridRowParams>();

    useEffect(() => {
        getCollectionData(COLLECTION_ID.MEMBER).then((data) => {
            console.log(data);
            setMembersData(data);
        });
    }, []);

    const deleteSelectedUsers = () => {
        // TODO: Add confirmation dialog

        deleteMembers(selectedRows as Array<string>);
    };

    console.log('members');

    return (
        <div id="member-dashboard">
            <div className={classes.tableWrapper}>
                <CustomDataGrid
                    columns={columns}
                    rows={membersData}
                    setSelectionModel={setSelectedRows}
                    selectionModel={selectedRows}
                    setUpdatePanelOpen={setIsUpdatePanelOpen}
                    setClickedRow={setClickedRow}
                />
            </div>

            <AddMemberDialog open={isAddPanelOpen} onClose={() => setIsAddPanelOpen(false)} />
            <UpdateMemberDialog
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

export default Members;
