import React from 'react';
import { FormikProps } from 'formik';
import { FEEDBACK } from '../../models/firestoreModel';
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

interface FeedbackFormProps {
    formik: FormikProps<FEEDBACK>;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ formik }: FeedbackFormProps) => {
    const classes = useStyles();

    return (
        <form noValidate autoComplete="off" className={classes.root}>
            <TextField
                fullWidth
                variant="standard"
                id="newFeedbackName"
                name="name"
                label="Name of User"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
                fullWidth
                variant="standard"
                id="newFeedbackText"
                name="feedback"
                label="Feedback"
                value={formik.values.feedback}
                onChange={formik.handleChange}
                error={formik.touched.feedback && Boolean(formik.errors.feedback)}
                helperText={formik.touched.feedback && formik.errors.feedback}
            />

            <TextField
                fullWidth
                variant="standard"
                id="newFeedbackUid"
                name="uid"
                label="User UID"
                value={formik.values.uid}
                onChange={formik.handleChange}
                error={formik.touched.uid && Boolean(formik.errors.uid)}
                helperText={formik.touched.uid && formik.errors.uid}
            />

            <TextField
                fullWidth
                variant="standard"
                id="newFeedbackCreatedAt"
                name="createdAt"
                label="Created At"
                value={formik.values.createdAt}
                onChange={formik.handleChange}
                error={formik.touched.createdAt && Boolean(formik.errors.createdAt)}
                helperText={formik.touched.createdAt && formik.errors.createdAt}
            />
        </form>
    );
};

export default FeedbackForm;
