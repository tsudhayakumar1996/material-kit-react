import { Box } from '@mui/material';
import { bgBlur } from '../stylingHelpers/bgBlur';
import { useTheme } from '@mui/material/styles';

export const PostShowComponent = ({post}) => {

    const theme = useTheme();

    return(
        <>
            <img src={post?.images[0]?.src ? post?.images[0]?.src : '/poster-placeholder.png'}
                loading='lazy'
                alt={'alt pic...'}    
                style={{height:250, borderTopRightRadius: 8, borderTopLeftRadius: 8, objectFit:'cover'}}                        
            />                        
            <Box 
                sx={{position:'absolute', 
                    bottom: 0, 
                    left: 0,
                    width:1,
                    height: 0.3,                                    
                    ...bgBlur({color: theme.palette.info.lighter, blur: 6, opacity: 0.7}),
                    color:'#ffffff',
                    p:1,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,                                    
                    display:'flex', 
                    flexDirection:'column',
                    justifyContent:'center',
                    transition: 'all 0.5s'
                }}
            >
                <p className='no-margin'>{post?.name}</p>
                <p className='no-margin'>{post?.categoryName}</p>                            
            </Box> 
        </>
    )
}