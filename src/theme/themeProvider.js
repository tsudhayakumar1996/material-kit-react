import { CssBaseline } from "@mui/material";
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { GlobalStyles } from "./globalStyles";
import { typography } from "./typography";
import { palette } from "./palette";
import { customShadows } from "./customShadow";

export default function ThemeProvider ({children}) {

    const themeOptions = useMemo(() => ({
        typography,
        palette,
        customShadows: customShadows(),
    }),[]);

    const theme = createTheme(themeOptions);

    return(
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles />
                {children}
            </MUIThemeProvider>
        </StyledEngineProvider>
    )

};