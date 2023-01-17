import { alpha } from "@mui/material/styles";
import { palette } from "./palette"

export const customShadows = () => {

    const color = palette.grey[500];    

    return{
        card: `0 0 2px 0 ${alpha(color, 0.2)}, 0 12px 24px -4px ${alpha(color, 0.12)}`,
    }
}