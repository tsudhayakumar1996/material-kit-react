import { useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Header } from "../components/header"
import { Nav } from "../components/nav"
import { Home } from "../pages/home"
import { Post } from "../pages/post"

export const LoggedInRoutes = () => {  
    
    const [open, setopen] = useState(false);

    return(
        <>    
            <Header onOpenNav={() => setopen(true)} />
            <Nav openNav={open} onCloseNav={() => setopen(false)} />         
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/posts' element={<Post />} />
                <Route path='/login' element={<Navigate to={"/"} />} />
            </Routes>
        </>
    )
}