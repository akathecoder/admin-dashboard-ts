import React from 'react';
import { FormikProps } from 'formik';
import { ARTICLE } from '../../models/firestoreModel';
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

interface ArticleFormProps {
    formik: FormikProps<ARTICLE>;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ formik }: ArticleFormProps) => {
    const classes = useStyles();

    return (
        <form noValidate autoComplete="off" className={classes.root}>
            <TextField
                fullWidth
                variant="standard"
                id="newArticleBanner"
                name="articleBanner"
                label="Article Banner"
                value={formik.values.articleBanner}
                onChange={formik.handleChange}
                error={formik.touched.articleBanner && Boolean(formik.errors.articleBanner)}
                helperText={formik.touched.articleBanner && formik.errors.articleBanner}
            />

            <TextField
                fullWidth
                variant="standard"
                id="newArticleTitle"
                name="articleTitle"
                label="Article Title"
                value={formik.values.articleTitle}
                onChange={formik.handleChange}
                error={formik.touched.articleTitle && Boolean(formik.errors.articleTitle)}
                helperText={formik.touched.articleTitle && formik.errors.articleTitle}
            />

            <TextField
                fullWidth
                variant="standard"
                id="newArticleDescription"
                name="articleDescription"
                label="Article Description"
                value={formik.values.articleDescription}
                onChange={formik.handleChange}
                error={formik.touched.articleDescription && Boolean(formik.errors.articleDescription)}
                helperText={formik.touched.articleDescription && formik.errors.articleDescription}
            />

            <TextField
                fullWidth
                variant="standard"
                id="newArticleType"
                name="type"
                label="Type"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
            />

            <TextField
                fullWidth
                variant="standard"
                id="newArticlePostedBy"
                name="postedBy"
                label="Posted By"
                value={formik.values.postedBy}
                onChange={formik.handleChange}
                error={formik.touched.postedBy && Boolean(formik.errors.postedBy)}
                helperText={formik.touched.postedBy && formik.errors.postedBy}
            />

            <TextField
                fullWidth
                variant="standard"
                id="newArticlePostedOn"
                name="postedOn"
                label="Posted On"
                value={formik.values.postedOn}
                onChange={formik.handleChange}
                error={formik.touched.postedOn && Boolean(formik.errors.postedOn)}
                helperText={formik.touched.postedOn && formik.errors.postedOn}
            />

            <TextField
                fullWidth
                variant="standard"
                id="newArticleLinks"
                name="links"
                label="Links"
                value={formik.values.links}
                onChange={formik.handleChange}
                error={formik.touched.links && Boolean(formik.errors.links)}
                helperText={formik.touched.links && formik.errors.links}
            />
        </form>
    );
};

export default ArticleForm;
