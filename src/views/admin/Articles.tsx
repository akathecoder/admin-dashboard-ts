import { createStyles, Fab, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { GridColumns, GridRowId, GridRowParams } from '@material-ui/data-grid';
import { CollectionDataType, COLLECTION_ID } from '../../models/firestoreModel';
import { getCollectionData } from '../../utils/firebase/firestore';
import { Add, Delete } from '@material-ui/icons';
import CustomDataGrid from '../../components/General/CustomDataGrid';
import AddArticleDialog from '../../components/Article/AddArticleDialog';
import UpdateArticleDialog from '../../components/Article/UpdateArticleDialog';
import { deleteArticles } from '../../utils/articleFunctions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tableWrapper: {
            marginTop: '1rem',
            marginBottom: '1rem',
            width: '100%',
            height: '84vh',
        },
        fabWrapper: {
            '& > *': {
                margin: theme.spacing(1),
            },
            bottom: theme.spacing(2),
            right: theme.spacing(2),
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column-reverse',
        },
    }),
);

const columns: GridColumns = [
    {
        field: 'articleTitle',
        headerName: 'Article Title',
        type: 'string',
        width: 400,
    },
    {
        field: 'articleDescription',
        headerName: 'Article Description',
        type: 'string',
        width: 300,
    },
    {
        field: 'type',
        headerName: 'Type',
        type: 'string',
        width: 200,
    },
    {
        field: 'postedBy',
        headerName: 'Posted By',
        type: 'string',
        width: 200,
    },
    {
        field: 'postedOn',
        headerName: 'Posted On',
        type: 'date',
        width: 300,
    },
    {
        field: 'articleBanner',
        headerName: 'Article Banner',
        type: 'string',
        width: 300,
    },
    {
        field: 'links',
        headerName: 'Links',
        type: 'string',
        width: 300,
    },
];

const Articles: React.FC = () => {
    const classes = useStyles();

    const [articlesData, setArticlesData] = useState<CollectionDataType>([]);
    const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
    const [isUpdatePanelOpen, setIsUpdatePanelOpen] = useState(false);
    const [selectedRows, setSelectedRows] = React.useState<GridRowId[]>([]);
    const [clickedRow, setClickedRow] = useState<GridRowParams>();

    useEffect(() => {
        getCollectionData(COLLECTION_ID.ARTICLE).then((data) => {
            console.log(data);
            setArticlesData(data);
        });
    }, []);

    const deleteSelectedUsers = () => {
        // TODO: Add confirmation dialog

        deleteArticles(selectedRows as Array<string>).then(() => {
            window.location.reload();
        });
    };

    console.log('articles');

    return (
        <div id="articles-dashboard">
            <div className={classes.tableWrapper}>
                <CustomDataGrid
                    columns={columns}
                    rows={articlesData}
                    setSelectionModel={setSelectedRows}
                    selectionModel={selectedRows}
                    setUpdatePanelOpen={setIsUpdatePanelOpen}
                    setClickedRow={setClickedRow}
                />
            </div>

            <AddArticleDialog open={isAddPanelOpen} onClose={() => setIsAddPanelOpen(false)} />
            <UpdateArticleDialog
                open={isUpdatePanelOpen}
                onClose={() => setIsUpdatePanelOpen(false)}
                rowData={clickedRow?.row}
            />

            <div className={classes.fabWrapper}>
                <Fab color="primary" size="large" aria-label="add" onClick={() => setIsAddPanelOpen(true)}>
                    <Add />
                </Fab>

                <Fab color="secondary" size="medium" aria-label="add" onClick={deleteSelectedUsers}>
                    <Delete />
                </Fab>
            </div>
        </div>
    );
};

export default Articles;
