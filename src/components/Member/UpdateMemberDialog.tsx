import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    Theme,
} from '@material-ui/core';
import { GridRowData } from '@material-ui/data-grid';
import * as yup from 'yup';
import { useFormik, FormikHelpers } from 'formik';
import React, { useEffect } from 'react';
import { MEMBER } from '../../models/firestoreModel';
import { updateMember } from '../../utils/memberFunctions';
import MemberForm from './MemberForm';

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

const UpdateMemberDialog: React.FC<UpdateMemberDialogProps> = ({ open, onClose, rowData }: UpdateMemberDialogProps) => {
    const classes = useStyles();

    useEffect(() => {
        if (rowData) {
            formik.setValues(rowData as MEMBER);
        }
    }, [rowData]);

    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    const handleSubmit = (values: MEMBER, { setSubmitting, resetForm }: FormikHelpers<MEMBER>) => {
        const {
            id,
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
        } = values;

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

        updateMember(id, data).then(() => {
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
            <DialogTitle id="simple-dialog-title">Update Member</DialogTitle>
            <DialogContent>
                <DialogContentText>Fill in the data for the new member.</DialogContentText>

                <MemberForm formik={formik} />
            </DialogContent>
            <DialogActions className={classes.root}>
                <Button
                    color="primary"
                    variant="text"
                    size="large"
                    onClick={formik.submitForm}
                    disabled={formik.isSubmitting}
                >
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateMemberDialog;
