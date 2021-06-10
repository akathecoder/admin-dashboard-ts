import React from 'react';
import { FormikProps } from 'formik';
import { MEMBER } from '../../models/firestoreModel';
import { createStyles, makeStyles, TextField, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);

interface MemberFormProps {
    formik: FormikProps<MEMBER>;
}

const MemberForm: React.FC<MemberFormProps> = ({ formik }: MemberFormProps) => {
    const classes = useStyles();

    return (
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
    );
};

export default MemberForm;
