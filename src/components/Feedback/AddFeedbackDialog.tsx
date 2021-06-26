import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { FEEDBACK } from '../../models/firestoreModel';
import firebase from 'firebase/app';
import FeedbackForm from './FeedbackForm';
import { createFeedback } from '../../utils/feedbackFunctions';

interface AddFeedbackDialogProps {
    open: boolean;
    onClose: () => void;
}

const validationSchema = yup.object({
    name: yup.string().required('Name of User is required.'),
    uid: yup.string().required('UID of User is required.'),
    feedback: yup.string().required('Feedback is required.'),
    createdAt: yup.date().required('Created At is Required.'),
});

const initialValues: FEEDBACK = {
    name: '',
    feedback: '',
    uid: '',
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
};

const AddFeedbackDialog: React.FC<AddFeedbackDialogProps> = ({ open, onClose }: AddFeedbackDialogProps) => {
    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    const handleSubmit = (values: FEEDBACK, { setSubmitting, resetForm }: FormikHelpers<FEEDBACK>) => {
        console.log(values);

        const { name, uid, feedback, createdAt } = values;

        if (!name || !uid || !feedback || !createdAt) {
            return;
        }

        createFeedback(uid, name, feedback, createdAt).then(() => {
            setSubmitting(false);
            resetForm();
            onClose();
            window.location.reload();
        });
    };

    const formik = useFormik<FEEDBACK>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="simple-dialog-title">Add Feedback</DialogTitle>
            <DialogContent>
                <DialogContentText>Fill in the data for the new feedback.</DialogContentText>
                <FeedbackForm formik={formik} />
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

export default AddFeedbackDialog;
