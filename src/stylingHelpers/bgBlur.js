import { alpha } from "@mui/material"

export const bgBlur = ({color, blur, opacity}) => {
    return {
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity)
    }
}