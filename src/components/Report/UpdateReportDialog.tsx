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
import { REPORT } from '../../models/firestoreModel';
import firebase from '../../utils/firebase/firebase';
import { updateReport } from '../../utils/reportFunctions';
import ReportForm from './ReportForm';

interface UpdateReportDialogProps {
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

const UpdateReportDialog: React.FC<UpdateReportDialogProps> = ({ open, onClose, rowData }: UpdateReportDialogProps) => {
    const classes = useStyles();

    useEffect(() => {
        if (rowData) {
            formik.setValues(rowData as REPORT);
        }
    }, [rowData]);

    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    const handleSubmit = (values: REPORT, { setSubmitting, resetForm }: FormikHelpers<REPORT>) => {
        const {
            createdAt,
            isUserReported,
            reason,
            reportingUserName,
            reportingUserUid,
            id,
            reportedPostId,
            reportedUserName,
            reportedUserUid,
        } = values;

        if (!createdAt || !reason || !reportingUserName || !reportingUserUid || !id) {
            return;
        }

        const data: REPORT = {
            createdAt,
            reason,
            reportingUserUid,
            reportingUserName,
            isUserReported,
            reportedUserUid,
            reportedUserName,
            reportedPostId,
        };

        updateReport(id, data).then(() => {
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
            <DialogTitle id="simple-dialog-title">Update Feedback</DialogTitle>
            <DialogContent>
                <DialogContentText>Fill in the data for the new feedback.</DialogContentText>

                <ReportForm formik={formik} />
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

export default UpdateReportDialog;
