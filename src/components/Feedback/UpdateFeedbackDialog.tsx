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
import { FEEDBACK } from '../../models/firestoreModel';
import firebase from '../../utils/firebase/firebase';
import { updateFeedback } from '../../utils/feedbackFunctions';
import FeedbackForm from './FeedbackForm';

interface UpdateFeedbackDialogProps {
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

const UpdateFeedbackDialog: React.FC<UpdateFeedbackDialogProps> = ({
    open,
    onClose,
    rowData,
}: UpdateFeedbackDialogProps) => {
    const classes = useStyles();

    useEffect(() => {
        if (rowData) {
            formik.setValues(rowData as FEEDBACK);
        }
    }, [rowData]);

    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    const handleSubmit = (values: FEEDBACK, { setSubmitting, resetForm }: FormikHelpers<FEEDBACK>) => {
        const { createdAt, feedback, name, uid, id } = values;

        if (!createdAt || !feedback || !name || !uid || !id) {
            return;
        }

        const data: FEEDBACK = {
            createdAt,
            feedback,
            name,
            uid,
        };

        updateFeedback(id, data).then(() => {
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
            <DialogTitle id="simple-dialog-title">Update Feedback</DialogTitle>
            <DialogContent>
                <DialogContentText>Fill in the data for the new feedback.</DialogContentText>

                <FeedbackForm formik={formik} />
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

export default UpdateFeedbackDialog;
