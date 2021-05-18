import React from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import Sidebar from '../components/Sidebar';
import AppBar from '../components/Appbar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
    }),
);

const DashboardLayout: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar />
            <Sidebar />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography paragraph>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam laudantium dignissimos labore
                    temporibus necessitatibus excepturi iste, corporis reprehenderit. Doloribus provident sed dolorum
                    possimus est dicta ad eaque autem iusto quod perferendis consequatur, non, perspiciatis
                    reprehenderit nam.
                    <br />
                    Harum sint doloribus at consequuntur quisquam deleniti hic autem? Cumque deleniti maiores quas
                    blanditiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum laborum illo dolore iste?
                    Assumenda distinctio maiores animi. Eaque explicabo numquam nam quibusdam quisquam, soluta
                    cupiditate assumenda commodi ducimus labore nulla tenetur quasi velit voluptates rerum. Illum
                    possimus illo placeat temporibus adipisci maxime rerum, beatae, dignissimos itaque et quas molestias
                    dolore iure consequatur aliquid quaerat repellat, ipsa in labore? Molestiae totam magni fugit
                    aperiam iure! Ad delectus incidunt sequi iure repellendus sunt quam porro voluptatem! Dolores sit
                    fuga et, ducimus fugit dolore tempore atque porro. Error at illum ab sed harum eius placeat!
                    Dolorem, quaerat veniam? Sit magni, doloremque perferendis asperiores, ex fugiat quam sapiente harum
                    ea vero corrupti repudiandae iusto doloribus! Dolorem natus quibusdam voluptatibus dolorum dolores
                    distinctio vitae! Adipisci suscipit vel repellat nisi quo voluptatibus quasi quam at consequuntur
                    itaque ratione harum, quod ipsa debitis eligendi numquam incidunt, vero voluptatem assumenda atque
                    blanditiis necessitatibus nobis veniam beatae! Temporibus voluptatibus ea nulla neque doloribus, quo
                    reiciendis itaque quam asperiores veniam beatae voluptas provident quae, quos corporis iure nostrum
                    facilis, officia deserunt. Culpa ad fugiat corrupti optio, dolore maxime suscipit. Facere
                    voluptatibus eaque consectetur, accusamus veniam aperiam totam eos quas architecto commodi in qui,
                    similique cupiditate cumque dolore libero! Laborum fugit fugiat cupiditate, facilis optio
                    perspiciatis voluptatem modi inventore doloremque, eaque dolor quis, quibusdam deserunt laudantium
                    similique! A voluptatem veritatis debitis, ut veniam distinctio impedit itaque qui sed accusamus ea
                    nemo facere ad quae voluptates, illum corrupti magnam harum quas officiis adipisci ullam culpa
                    saepe? Dicta reiciendis incidunt cupiditate repellendus. Commodi odio cum hic suscipit nobis itaque
                    eligendi minus dignissimos. Impedit quas beatae vel vitae accusamus laborum recusandae quisquam modi
                    eos libero ipsum praesentium mollitia, aspernatur placeat quidem nesciunt consequatur omnis nemo
                    numquam veritatis. Illo dolorum ad laboriosam laudantium possimus voluptatum adipisci velit
                    veritatis eius incidunt voluptate praesentium similique numquam ratione eveniet sit reprehenderit in
                    quod, voluptatem atque explicabo saepe! Illum amet atque ratione suscipit placeat modi quasi
                    laboriosam voluptas error quia vel deserunt nemo molestias, quidem est expedita. Sapiente sequi
                    dolores itaque nam eius ducimus corrupti nemo odio facere distinctio. Voluptatem obcaecati, dolores
                    vitae in nihil ad quod porro reprehenderit quas distinctio excepturi suscipit maxime veritatis quia
                    eius cupiditate consectetur quisquam dolore? Maxime vitae quam doloribus consequuntur placeat
                    tempore corrupti iure molestias repellat dolor? Repudiandae fuga quae eum asperiores nam in sunt
                    consequuntur dolor sed, cum ex laudantium enim ipsa dolorum beatae adipisci minus consectetur
                    accusamus ducimus! Eos aperiam quia unde possimus praesentium expedita, molestiae suscipit
                    laboriosam magnam laudantium sequi asperiores porro ut laborum, hic eaque repudiandae fugiat et
                    natus facilis, quo qui. Impedit sed laboriosam dolorum excepturi ratione placeat maiores, facere
                    delectus aut praesentium, ut nulla culpa temporibus fugiat ullam vero! Iste, minima a? Perferendis
                    quasi consequatur explicabo! Libero tempore similique, beatae est accusantium esse maxime
                    consequatur dolor a quod suscipit quibusdam vel iure nihil id reiciendis nulla soluta culpa rem
                    saepe? Tempore odit soluta, saepe quam vero itaque vel. Quidem labore odit maxime dolorem corporis
                    totam neque velit obcaecati aliquam. Neque iusto reiciendis delectus inventore repellendus placeat
                    ipsam!
                </Typography>
            </main>
        </div>
    );
};

export default DashboardLayout;
