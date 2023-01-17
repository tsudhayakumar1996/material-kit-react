import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, InputAdornment, TextField, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { storageSet } from "../helpers/storageHelpers";
import { useDispatch } from "react-redux";
import { authAction } from "../redux/actions/authActions";
import { unwrapResult } from "@reduxjs/toolkit";
import { logInUser } from "../redux/slices/authSlice";

export const LoginForm = () => {    

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [userCredentials, setuserCredentials] = useState({
        email: '',
        password:''
    })

    const handleClick = () => {
        let postData = {
            ...userCredentials,
            realm: "RG_SEED",
            user_type: "Superadmin"
        }
        dispatch(authAction({endUrl: '/auth/signin', postData: postData})).then(unwrapResult).then(res => {
            if(res?.data?.statusCode  === 200) {                
                dispatch(logInUser());
                storageSet('isLoggedIn', true);
                storageSet('email',res?.data?.data?.email);
                storageSet('user',res?.data?.data?.user_name);
                storageSet('token',res?.data?.access_token)
                navigate('/');
            };
        });        
    };

    const userCredentialChangeHandler = (val, key) => {
        setuserCredentials({
            ...userCredentials,
            [key] : val
        })
    }

    return(
        <>
            <Stack spacing={3}>
                <TextField 
                    name="email" 
                    label="Email address" 
                    value={userCredentials['email']}
                    onChange={(e) => userCredentialChangeHandler(e.target.value,'email')}
                    autoFocus 
                />
                <TextField
                    name="password"
                    label="Password"
                    value={userCredentials['password']}
                    onChange={(e) => userCredentialChangeHandler(e.target.value,'password')}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">                            
                            <IconButton onClick={() => setShowPassword(!showPassword)}> 
                                {showPassword ?
                                    <RemoveRedEyeIcon  />
                                    : 
                                    <VisibilityOffIcon />
                                }
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <LoadingButton sx={{mt:3}} fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                Login
            </LoadingButton>
        </>
    )
}