import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    TextField,
    Theme,
} from '@material-ui/core';
import { GridRowData } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import { MEMBER } from '../../models/firestoreModel';
import { updateMember } from '../../utils/memberFunctions';

interface UpdateMemberDialogProps {
    open: boolean;
    onClose: () => void;
    rowData: GridRowData | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);
const UpdateMemberDialog: React.FC<UpdateMemberDialogProps> = ({ open, onClose, rowData }: UpdateMemberDialogProps) => {
    const classes = useStyles();

    // Member Data States
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState<number | null>(null);
    const [profileImage, setProfileImage] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [college, setCollege] = useState('');
    const [currentProfession, setCurrentProfession] = useState('');
    const [uid, setUid] = useState('');
    const [yearOfPassing, setYearOfPassing] = useState<number | null>(null);
    const [address, setAddress] = useState('');

    console.log(id);

    useEffect(() => {
        if (rowData) {
            setId(rowData.id);
            setName(rowData.name);
            setPhone(rowData.phone);
            setProfileImage(rowData.profileImage);
            setGender(rowData.gender);
            setEmail(rowData.email);
            setCollege(rowData.college);
            setCurrentProfession(rowData.currentProfession);
            setUid(rowData.uid);
            setYearOfPassing(rowData.yearOfPassing);
            setAddress(rowData.address);
        }
    }, [rowData]);

    const handleSubmit = () => {
        if (!name || !phone || !gender || !email || !college || !currentProfession || !uid || !yearOfPassing || !id) {
            return;
        }

        const data: MEMBER = {
            name,
            phone,
            profileImage,
            gender,
            email,
            college,
            currentProfession,
            uid,
            yearOfPassing,
            address,
        };

        updateMember(id, data);
        onClose();
    };

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle id="simple-dialog-title">Update Member</DialogTitle>
            <DialogContent>
                <DialogContentText>Fill in the data for the new member.</DialogContentText>

                <form noValidate autoComplete="off" className={classes.root}>
                    <TextField
                        id="newMemberProfilePic"
                        label="Profile Picture"
                        helperText="Please enter user's DP"
                        variant="standard"
                        value={profileImage}
                        onChange={(e) => setProfileImage(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        id="newMemberUid"
                        label="UID"
                        helperText="Please enter user's uid"
                        variant="standard"
                        value={uid}
                        onChange={(e) => setUid(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        id="newMemberName"
                        label="Name"
                        helperText="Please enter user's name"
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                    />

                    <TextField
                        id="newMemberPhone"
                        label="Phone"
                        type="number"
                        helperText="Please enter user's phone number"
                        variant="standard"
                        value={phone}
                        onChange={(e) => setPhone(Number(e.target.value))}
                        required
                        fullWidth
                    />

                    <TextField
                        id="newMemberGender"
                        label="Gender"
                        helperText="Please select user's Gender"
                        variant="standard"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        fullWidth
                    />

                    <TextField
                        id="newMemberEmail"
                        label="Email ID"
                        helperText="Please enter user's email id"
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                    />

                    <TextField
                        id="newMemberCollege"
                        label="College"
                        helperText="Please enter user's college"
                        variant="standard"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        required
                        fullWidth
                    />

                    <TextField
                        id="newMemberCurrentProfession"
                        label="Current Profession"
                        helperText="Please enter user's current profession"
                        variant="standard"
                        value={currentProfession}
                        onChange={(e) => setCurrentProfession(e.target.value)}
                        required
                        fullWidth
                    />

                    <TextField
                        id="newMemberYearOfPassing"
                        label="Year of Passing"
                        helperText="Please enter user's year of Passing"
                        variant="standard"
                        value={yearOfPassing}
                        onChange={(e) => setYearOfPassing(Number(e.target.value))}
                        required
                        fullWidth
                    />

                    <TextField
                        id="newMemberAddress"
                        label="Address"
                        helperText="Please enter user's address"
                        variant="standard"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth
                    />
                </form>
            </DialogContent>
            <DialogActions className={classes.root}>
                <Button color="primary" variant="text" size="large" onClick={handleSubmit}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateMemberDialog;
