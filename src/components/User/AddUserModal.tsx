import { createStyles, makeStyles, MenuItem, TextField, Theme, Button } from '@material-ui/core';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { FIREBASE_FIRESTORE_PROJECT_ID } from '../../assets/themes/variables';
import { userRoleTypes } from '../../models/firestoreModel';
import { createUser } from '../../utils/userFunctions';
import CloseIcon from '@material-ui/icons/Close';

// Modal.setAppElement('#user-dashboard');

interface AddUserModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: '1rem',
        },
        headerContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: '1rem',
            paddingLeft: '1rem',
            fontSize: '1.2rem',
            fontWeight: 500,
        },
        crossContainer: {
            cursor: 'pointer',
        },
    }),
);

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, setIsOpen }: AddUserModalProps) => {
    const classes = useStyles();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<userRoleTypes | null>(null);

    const closeModal = () => {
        setIsOpen(false);
        setName('');
        setEmail('');
        setRole(null);
    };

    const handleRoleChange = (role: string): void => {
        switch (role) {
            case userRoleTypes.ADMIN:
                setRole(userRoleTypes.ADMIN);
                break;
            case userRoleTypes.DEVELOPER:
                setRole(userRoleTypes.DEVELOPER);
                break;
            case userRoleTypes.MANAGER:
                setRole(userRoleTypes.MANAGER);
                break;
            default:
                console.error("Couldn't handle new user role change. Got User Role == " + role);
                break;
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !email || !role) {
            return;
        }

        createUser(FIREBASE_FIRESTORE_PROJECT_ID, name, role, email);

        closeModal();
    };

    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Add User Details">
                <div className={classes.headerContainer} onClick={closeModal}>
                    <span>Add user</span>
                    <div className={classes.crossContainer}>
                        <CloseIcon />
                    </div>
                </div>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
                    <div className={classes.root}>
                        <TextField
                            id="newUserName"
                            label="Name"
                            helperText="Please enter user's name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <TextField
                            id="newUserRole"
                            select
                            label="Role"
                            helperText="Please select user's role"
                            variant="outlined"
                            value={role}
                            onChange={(e) => handleRoleChange(e.target.value)}
                            required
                        >
                            <MenuItem value={userRoleTypes.ADMIN}>Admin</MenuItem>
                            <MenuItem value={userRoleTypes.MANAGER}>Manager</MenuItem>
                            <MenuItem value={userRoleTypes.DEVELOPER}>Developer</MenuItem>
                        </TextField>

                        <TextField
                            id="newUserEmail"
                            label="Email"
                            helperText="Please enter user's email address"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={classes.buttonContainer}>
                        <Button variant="outlined" color="primary" size="large" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AddUserModal;
