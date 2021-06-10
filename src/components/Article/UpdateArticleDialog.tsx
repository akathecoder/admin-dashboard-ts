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
import { ARTICLE, articleTypes } from '../../models/firestoreModel';
import firebase from '../../utils/firebase/firebase';
import ArticleForm from './ArticleForm';
import { updateArticle } from '../../utils/articleFunctions';

interface UpdateArticleDialogProps {
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
    articleBanner: yup.string().url('Enter a valid image').optional(),
    articleDescription: yup.string().required('Article Description is required'),
    articleTitle: yup.string().required('Article Title is required'),
    postedBy: yup.string().required('Posted By is required'),
    postedOn: yup.date().required('Posted By is required'),
    type: yup.string().oneOf([articleTypes.BLOG, articleTypes.NEWS]).required('Type is Required'),
    links: yup.array().of(yup.string().url()).optional(),
});

const initialValues: ARTICLE = {
    articleBanner: '',
    articleDescription: '',
    articleTitle: '',
    postedBy: '',
    postedOn: firebase.firestore.Timestamp.fromDate(new Date()),
    type: articleTypes.BLOG,
    links: [],
};

const UpdateArticleDialog: React.FC<UpdateArticleDialogProps> = ({
    open,
    onClose,
    rowData,
}: UpdateArticleDialogProps) => {
    const classes = useStyles();

    useEffect(() => {
        if (rowData) {
            formik.setValues(rowData as ARTICLE);
        }
    }, [rowData]);

    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    const handleSubmit = (values: ARTICLE, { setSubmitting, resetForm }: FormikHelpers<ARTICLE>) => {
        const { id, articleDescription, articleTitle, postedBy, postedOn, type, articleBanner, links } = values;

        if (!articleDescription || !articleTitle || !postedBy || !postedOn || !type || !id) {
            return;
        }

        const data: ARTICLE = {
            articleDescription,
            articleTitle,
            postedBy,
            postedOn,
            type,
            articleBanner,
            links,
        };

        updateArticle(id, data).then(() => {
            setSubmitting(false);
            resetForm();
            onClose();
            window.location.reload();
        });
    };

    const formik = useFormik<ARTICLE>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="simple-dialog-title">Update Article</DialogTitle>
            <DialogContent>
                <DialogContentText>Fill in the data for the new article.</DialogContentText>

                <ArticleForm formik={formik} />
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

export default UpdateArticleDialog;
