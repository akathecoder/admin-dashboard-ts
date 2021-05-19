import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
    typography: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
    },
    palette: {
        primary: {
            main: '#109CF1',
            contrastText: '#FFFFFF',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});
