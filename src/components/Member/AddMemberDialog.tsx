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
import React from 'react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { createMember } from '../../utils/memberFunctions';
import { MEMBER } from '../../models/firestoreModel';

interface AddMemberDialogProps {
    open: boolean;
    onClose: () => void;
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

const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    phone: yup.number().required('Phone number is required'),
    gender: yup.string().oneOf(['male', 'female'], 'Gender is ').required('Gender is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    college: yup.string().required('Email is required'),
    currentProfession: yup.string().required('Current Profession is required'),
    uid: yup.string().required('UID is required'),
    yearOfPassing: yup.number().required('Year of Passing is required'),
    profileImage: yup.string().url('Enter a valid Profile Picture').optional(),
    address: yup.string().optional(),
});

const initialValues: MEMBER = {
    name: '',
    phone: 0,
    gender: '',
    email: '',
    college: '',
    currentProfession: '',
    uid: '',
    yearOfPassing: 0,
    profileImage: '',
    address: '',
};

const AddMemberDialog: React.FC<AddMemberDialogProps> = ({ open, onClose }: AddMemberDialogProps) => {
    const classes = useStyles();

    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    const handleSubmit = (values: MEMBER, { setSubmitting, resetForm }: FormikHelpers<MEMBER>) => {
        console.log(values);

        const { name, phone, gender, email, college, currentProfession, uid, yearOfPassing, profileImage, address } =
            values;

        if (!name || !phone || !gender || !email || !college || !currentProfession || !uid || !yearOfPassing) {
            return;
        }

        createMember(
            name,
            phone,
            gender,
            email,
            college,
            currentProfession,
            uid,
            yearOfPassing,
            profileImage,
            address,
        ).then(() => {
            setSubmitting(false);
            resetForm();
            onClose();
        });
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="simple-dialog-title">Add Member</DialogTitle>
            <DialogContent>
                <DialogContentText>Fill in the data for the new member.</DialogContentText>

                <form noValidate autoComplete="off" className={classes.root}>
                    <TextField
                        fullWidth
                        variant="standard"
                        id="newMemberProfilePic"
                        name="profileImage"
                        label="Profile Picture"
                        value={formik.values.profileImage}
                        onChange={formik.handleChange}
                        error={formik.touched.profileImage && Boolean(formik.errors.profileImage)}
                        helperText={formik.touched.profileImage && formik.errors.profileImage}
                    />

                    <TextField
                        fullWidth
                        variant="standard"
                        id="newMemberUid"
                        name="uid"
                        label="UID"
                        value={formik.values.uid}
                        onChange={formik.handleChange}
                        error={formik.touched.uid && Boolean(formik.errors.uid)}
                        helperText={formik.touched.uid && formik.errors.uid}
                    />

                    <TextField
                        fullWidth
                        variant="standard"
                        id="newMemberName"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />

                    <TextField
                        fullWidth
                        variant="standard"
                        id="newMemberPhone"
                        name="phone"
                        label="Phone Number"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />

                    <TextField
                        fullWidth
                        variant="standard"
                        id="newMemberGender"
                        name="gender"
                        label="Gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                        helperText={formik.touched.gender && formik.errors.gender}
                    />

                    <TextField
                        fullWidth
                        variant="standard"
                        id="newMemberEmail"
                        name="email"
                        label="Email ID"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <TextField
                        fullWidth
                        variant="standard"
                        id="newMemberCollege"
                        name="college"
                        label="College"
                        value={formik.values.college}
                        onChange={formik.handleChange}
                        error={formik.touched.college && Boolean(formik.errors.college)}
                        helperText={formik.touched.college && formik.errors.college}
                    />

                    <TextField
                        fullWidth
                        variant="standard"
                        id="newMemberCurrentProfession"
                        name="currentProfession"
                        label="Current Profession"
                        value={formik.values.currentProfession}
                        onChange={formik.handleChange}
                        error={formik.touched.currentProfession && Boolean(formik.errors.currentProfession)}
                        helperText={formik.touched.currentProfession && formik.errors.currentProfession}
                    />

                    <TextField
                        fullWidth
                        variant="standard"
                        id="newMemberYearOfPassing"
                        name="yearOfPassing"
                        label="Year of Passing"
                        value={formik.values.yearOfPassing}
                        onChange={formik.handleChange}
                        error={formik.touched.yearOfPassing && Boolean(formik.errors.yearOfPassing)}
                        helperText={formik.touched.yearOfPassing && formik.errors.yearOfPassing}
                    />

                    <TextField
                        fullWidth
                        variant="standard"
                        id="newMemberAddress"
                        name="address"
                        label="Address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />
                </form>
            </DialogContent>
            <DialogActions className={classes.root}>
                <Button color="primary" variant="text" size="large" onClick={formik.submitForm}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddMemberDialog;
