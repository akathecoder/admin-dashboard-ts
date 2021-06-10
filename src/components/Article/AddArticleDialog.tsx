import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { ARTICLE, articleTypes } from '../../models/firestoreModel';
import firebase from 'firebase/app';
import { createArticle } from '../../utils/articleFunctions';
import ArticleForm from './ArticleForm';

interface AddArticleDialogProps {
    open: boolean;
    onClose: () => void;
}

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

const AddArticleDialog: React.FC<AddArticleDialogProps> = ({ open, onClose }: AddArticleDialogProps) => {
    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    const handleSubmit = (values: ARTICLE, { setSubmitting, resetForm }: FormikHelpers<ARTICLE>) => {
        console.log(values);

        const { articleBanner, articleDescription, articleTitle, postedBy, postedOn, type, links } = values;

        if (!articleDescription || !articleTitle || !postedBy || !postedOn || !type) {
            return;
        }

        createArticle(articleTitle, articleDescription, type, postedBy, postedOn, articleBanner, links).then(() => {
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
            <DialogTitle id="simple-dialog-title">Add Article</DialogTitle>
            <DialogContent>
                <DialogContentText>Fill in the data for the new article.</DialogContentText>
                <ArticleForm formik={formik} />
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

export default AddArticleDialog;
