import { createStyles, Fab, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
// import { COLORS } from '../../assets/themes/colors';
// import AddUserModal from '../../components/User/AddUserModal';
// import ModifyUserModal from '../../components/User/ModifyUserModal';
import {
    DataGrid,
    GridColumns,
    GridRowsProp,
    GridToolbar,
    GridEditCellPropsParams,
    GridRowId,
} from '@material-ui/data-grid';
import { CollectionDataType, COLLECTION_ID, PrimitiveTypes } from '../../models/firestoreModel';
import { getCollectionData } from '../../utils/firebase/firestore';
// import { deleteUsers } from '../../utils/userFunctions';
import { updateMember, deleteMembers } from '../../utils/memberFunctions';
import { Add, Delete } from '@material-ui/icons';
import AddMemberDialog from '../../components/Member/AddMemberDialog';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        buttonWrapper: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
        },
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

// const redButtonTheme = createMuiTheme({
//     palette: {
//         primary: {
//             main: COLORS.Red,
//             contrastText: COLORS.White,
//         },
//     },
// });

// const yellowButtonTheme = createMuiTheme({
//     palette: {
//         primary: {
//             main: COLORS.Yellow,
//             contrastText: COLORS.White,
//         },
//     },
// });

const columns: GridColumns = [
    {
        field: 'uid',
        headerName: 'UID',
        type: 'string',
        width: 400,
        editable: true,
    },
    {
        field: 'name',
        headerName: 'Name',
        type: 'string',
        width: 300,
        editable: true,
    },
    {
        field: 'phone',
        headerName: 'Phone No.',
        type: 'number',
        width: 200,
        align: 'left',
        headerAlign: 'left',
        editable: true,
    },
    {
        field: 'gender',
        headerName: 'Gender',
        type: 'string',
        width: 200,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email ID',
        type: 'string',
        width: 300,
        editable: true,
    },
    {
        field: 'college',
        headerName: 'College',
        type: 'string',
        width: 300,
        editable: true,
    },
    {
        field: 'currentProfession',
        headerName: 'Current Profession',
        type: 'string',
        width: 300,
        editable: true,
    },

    {
        field: 'yearOfPassing',
        headerName: 'Year Of Passing',
        type: 'number',
        width: 200,
        align: 'left',
        headerAlign: 'left',
        editable: true,
    },
    {
        field: 'address',
        headerName: 'Address',
        type: 'string',
        width: 400,
        editable: true,
    },
];

const Members: React.FC = () => {
    const classes = useStyles();

    const [membersData, setMembersData] = useState<CollectionDataType>([]);
    // const [selectedMembers, setSelectedMembers] = useState<Array<string>>([]);
    const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
    // const [isModifyPanelOpen, setIsModifyPanelOpen] = useState(false);

    const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);

    useEffect(() => {
        getCollectionData(COLLECTION_ID.MEMBER).then((data) => {
            console.log(data);
            setMembersData(data);
        });
    }, []);

    // const deleteSelectedUsers = () => {
    //     deleteUsers(selectedMembers).then(() => {
    //         window.location.reload();
    //     });
    // };

    const updateDataCell = (data: GridEditCellPropsParams) => {
        console.log('data', data);
        updateMember(data.id as string, data.field, data.props.value as PrimitiveTypes);
    };

    const deleteSelectedUsers = () => {
        // TODO: Add confirmation dialog

        deleteMembers(selectionModel as Array<string>);
    };

    console.log('members');
    // console.log(selectedMembers);

    return (
        <div id="member-dashboard">
            {/* <div className={classes.buttonWrapper}>
                <ThemeProvider theme={redButtonTheme}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={selectedMembers.length === 0 ? true : false}
                        onClick={deleteSelectedUsers}
                    >
                        Delete members
                    </Button>
                </ThemeProvider>
                <ThemeProvider theme={yellowButtonTheme}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => setIsModifyPanelOpen(true)}
                        disabled={selectedMembers.length === 1 ? false : true}
                    >
                        Modify members
                    </Button>
                </ThemeProvider>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => setIsAddPanelOpen(true)}
                    disabled={selectedMembers.length === 0 ? false : true}
                >
                    Add users
                </Button>
            </div> */}

            <div className={classes.tableWrapper}>
                <DataGrid
                    columns={columns}
                    rows={membersData as GridRowsProp}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    onEditCellChangeCommitted={updateDataCell}
                    checkboxSelection
                    onSelectionModelChange={(newSelection) => {
                        setSelectionModel(newSelection.selectionModel);
                    }}
                    selectionModel={selectionModel}
                />
            </div>

            {/* <AddUserModal isOpen={isAddPanelOpen} setIsOpen={setIsAddPanelOpen} /> */}
            {/* <ModifyUserModal isOpen={isModifyPanelOpen} setIsOpen={setIsModifyPanelOpen} userId={selectedMembers[0]} /> */}

            <AddMemberDialog open={isAddPanelOpen} onClose={() => setIsAddPanelOpen(false)} />

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
