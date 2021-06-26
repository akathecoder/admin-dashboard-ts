import React from 'react';
import { FormikProps } from 'formik';
import { REPORT } from '../../models/firestoreModel';
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

interface ReportFormProps {
    formik: FormikProps<REPORT>;
}

const ReportForm: React.FC<ReportFormProps> = ({ formik }: ReportFormProps) => {
    const classes = useStyles();

    return (
        <form noValidate autoComplete="off" className={classes.root}>
            <TextField
                fullWidth
                variant="standard"
                id="newReportCreatedAt"
                name="createdAt"
                label="Created At"
                value={formik.values.createdAt}
                onChange={formik.handleChange}
                error={formik.touched.createdAt && Boolean(formik.errors.createdAt)}
                helperText={formik.touched.createdAt && formik.errors.createdAt}
            />

            <TextField
                fullWidth
                variant="standard"
                id="newReportReason"
                name="reason"
                label="Reason"
                value={formik.values.reason}
                onChange={formik.handleChange}
                error={formik.touched.reason && Boolean(formik.errors.reason)}
                helperText={formik.touched.reason && formik.errors.reason}
            />

            <TextField
                fullWidth
                variant="standard"
                id="newReportReportingUserUid"
                name="reportingUserUid"
                label="Reporting User UID"
                value={formik.values.reportingUserUid}
                onChange={formik.handleChange}
                error={formik.touched.reportingUserUid && Boolean(formik.errors.reportingUserUid)}
                helperText={formik.touched.reportingUserUid && formik.errors.reportingUserUid}
            />

            <TextField
                fullWidth
                variant="standard"
                id="newReportReportingUserName"
                name="reportingUserName"
                label="Reporting User Name"
                value={formik.values.reportingUserName}
                onChange={formik.handleChange}
                error={formik.touched.reportingUserName && Boolean(formik.errors.reportingUserName)}
                helperText={formik.touched.reportingUserName && formik.errors.reportingUserName}
            />

            <TextField
                fullWidth
                variant="standard"
                id="newReportIsUserReported"
                name="isUserReported"
                label="Is User Reported"
                value={formik.values.isUserReported}
                onChange={formik.handleChange}
                error={formik.touched.isUserReported && Boolean(formik.errors.isUserReported)}
                helperText={formik.touched.isUserReported && formik.errors.isUserReported}
            />

            <TextField
                fullWidth
                variant="standard"
                id="newReportReportedUserUid"
                name="reportedUserUid"
                label="Reported User UID"
                value={formik.values.reportedUserUid}
                onChange={formik.handleChange}
                error={formik.touched.reportedUserUid && Boolean(formik.errors.reportedUserUid)}
                helperText={formik.touched.reportedUserUid && formik.errors.reportedUserUid}
            />

            <TextField
                fullWidth
                variant="standard"
                id="newReportReportedUserName"
                name="reportedUserName"
                label="Reported User Name"
                value={formik.values.reportedUserName}
                onChange={formik.handleChange}
                error={formik.touched.reportedUserName && Boolean(formik.errors.reportedUserName)}
                helperText={formik.touched.reportedUserName && formik.errors.reportedUserName}
            />

            <TextField
                fullWidth
                variant="standard"
                id="newReportReportedPostId"
                name="reportedPostId"
                label="reportedPostId"
                value={formik.values.reportedPostId}
                onChange={formik.handleChange}
                error={formik.touched.reportedPostId && Boolean(formik.errors.reportedPostId)}
                helperText={formik.touched.reportedPostId && formik.errors.reportedPostId}
            />
        </form>
    );
};

export default ReportForm;
