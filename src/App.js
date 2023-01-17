import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storageGet } from "./helpers/storageHelpers";
import { logInUser } from "./redux/slices/authSlice";
import { LoggedInRoutes } from "./routes/loggedInRoutes";
import { NotLoggedInRoutes } from "./routes/notLoggedInRoutes";

function App() {

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.authState);

  const loggedIn = storageGet('isLoggedIn');
  const hasAccess = isLoggedIn && loggedIn;

  const [routesReady, setroutesReady] = useState(false);

  useEffect(() => {
    if(loggedIn) dispatch(logInUser());
    setroutesReady(true)
  }, [loggedIn, dispatch])

  return (
    <>
      {routesReady &&
        <>
          {hasAccess ? 
            <LoggedInRoutes /> 
            : 
            <NotLoggedInRoutes />
          }
        </>
      }
    </>
  );
}

export default App;