import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { createMember } from '../../utils/memberFunctions';
import { MEMBER } from '../../models/firestoreModel';
import AddMemberForm from './AddMemberForm';

interface AddMemberDialogProps {
    open: boolean;
    onClose: () => void;
}

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

    const formik = useFormik<MEMBER>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="simple-dialog-title">Add Member</DialogTitle>
            <DialogContent>
                <DialogContentText>Fill in the data for the new member.</DialogContentText>
                <AddMemberForm formik={formik} />
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    variant="text"
                    size="large"
                    onClick={formik.submitForm}
                    disabled={formik.isSubmitting}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddMemberDialog;
