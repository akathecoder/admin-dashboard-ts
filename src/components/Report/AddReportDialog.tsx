import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { REPORT } from '../../models/firestoreModel';
import firebase from 'firebase/app';
import { createReport } from '../../utils/reportFunctions';
import ReportForm from './ReportForm';

interface AddReportDialogProps {
    open: boolean;
    onClose: () => void;
}

const validationSchema = yup.object({
    createdAt: yup.date().required('Required.'),
    reason: yup.string().required('Required'),
    reportingUserUid: yup.string().required('Required.'),
    reportingUserName: yup.string().required('Required.'),
    isUserReported: yup.boolean().required('Required.'),
    reportedUserUid: yup.string(),
    reportedUserName: yup.string(),
    reportedPostId: yup.string(),
});

const initialValues: REPORT = {
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    reason: '',
    reportingUserUid: '',
    reportingUserName: '',
    isUserReported: false,
    reportedUserUid: '',
    reportedUserName: '',
    reportedPostId: '',
};

const AddReportDialog: React.FC<AddReportDialogProps> = ({ open, onClose }: AddReportDialogProps) => {
    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    const handleSubmit = (values: REPORT, { setSubmitting, resetForm }: FormikHelpers<REPORT>) => {
        console.log(values);

        const {
            createdAt,
            isUserReported,
            reason,
            reportingUserName,
            reportingUserUid,
            reportedPostId,
            reportedUserName,
            reportedUserUid,
        } = values;

        if (!createdAt || !reason || !reportingUserName || !reportingUserUid) {
            return;
        }

        createReport(
            createdAt,
            reason,
            reportingUserUid,
            reportingUserName,
            isUserReported,
            reportedUserUid,
            reportedUserName,
            reportedPostId,
        ).then(() => {
            setSubmitting(false);
            resetForm();
            onClose();
            window.location.reload();
        });
    };

    const formik = useFormik<REPORT>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="simple-dialog-title">Add Report</DialogTitle>
            <DialogContent>
                <DialogContentText>Fill in the data for the new report.</DialogContentText>
                <ReportForm formik={formik} />
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

export default AddReportDialog;
