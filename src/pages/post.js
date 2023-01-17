import { styled } from '@mui/material/styles';
import { useRef, useCallback, useState } from 'react';
import { APP_BAR_DESKTOP, APP_BAR_MOBILE } from '../consts/consts';
import { updateDocTitle } from "../helpers/updateDocTitle";
import { PostShowComponent } from '../components/PostShowComponent';
import { usePostsGet } from '../hooks/usePostsGet';
import { Fab, ImageList, ImageListItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import NavigationIcon from '@mui/icons-material/Navigation';
import { useYScrolled } from '../hooks/useYScrolled';

export const Post = () => {

    updateDocTitle('Posts'); 
    const [activePage, setactivePage] = useState(0) 
    
    const {
       loading, 
       hasMore,
       posts 
    } = usePostsGet(activePage); 

    const {
        scrollPosition,        
    } = useYScrolled();

    const observer = useRef();
    const infinityScrollTriggerRef = useCallback(node => {
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){                              
                setactivePage( activePage + 1 )
            };
        });
        if(node) observer.current.observe(node);
    },[loading, hasMore, setactivePage]); 

    
    const Main = styled('div')(({ theme }) => ({
        flexGrow: 1,
        overflow: 'auto',
        minHeight: '100%',
        position:'relative',
        paddingTop: APP_BAR_MOBILE,
        paddingBottom: APP_BAR_DESKTOP,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
          paddingTop: APP_BAR_DESKTOP,          
          marginLeft: 280,
        },
    }));     

    const ImageGalleryList = styled(ImageList)(({ theme }) => ({
        rowHeight:250,
        gap: `${theme.spacing(1)}!important`,
        [theme.breakpoints.up('xs')]: {
            gridTemplateColumns: 'repeat(2, 1fr)!important'
        },
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: 'repeat(3, 1fr)!important'
        },
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'repeat(4, 1fr)!important'
        },
        [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: 'repeat(5, 1fr)!important'
        },
        [theme.breakpoints.up('xl')]: {
            gridTemplateColumns: 'repeat(6, 1fr)!important'
        },
    })); 
    
    const scrollToTopHandler = () => {
        window.scrollTo({top:0, behavior: 'smooth'});
    };

    return(
        <Main>       
            <ImageGalleryList>
                {posts.map((each,idx) => {                       
                    if(((posts.length) - 5) === idx) {                        
                        return(
                            <ImageListItem
                                component={Link}
                                key={idx}
                                ref={infinityScrollTriggerRef}
                                to={'/'}
                                sx={{
                                    position:'relative',
                                    overflowY:'hidden!important'
                                }}
                            >                        
                                <PostShowComponent post={each} />                        
                            </ImageListItem>
                        )
                    }else {                        
                        return(
                            <ImageListItem
                                component={Link}
                                key={idx}
                                to={'/'}
                                sx={{
                                    position:'relative',
                                    overflowY:'hidden!important'
                                }}
                            >                        
                                <PostShowComponent post={each} />                        
                            </ImageListItem>
                        )
                    }
                })}
            </ImageGalleryList>                
            {loading &&
                <Typography 
                    align='center' 
                    variant='h3'
                    sx={{
                        p: 1
                    }}
                >
                    Loading...
                </Typography>
            }
            {scrollPosition > 600 &&  
                <Fab
                    sx={{
                        position:'fixed',
                        bottom: 20,
                        right: 20,
                    }}
                    onClick={scrollToTopHandler}
                >
                    <NavigationIcon />    
                </Fab> 
            }
        </Main>
    )
}