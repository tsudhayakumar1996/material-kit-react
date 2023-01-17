import { useState, useEffect } from "react"

export const ErrorBoundary = ({ children }) => {
    const [error, seterror] = useState(false)

    useEffect(() => {
      const logError = (error, info) => {
        console.log(error, info)
      }

      if(error) {
        //you can also log the error to an error reporting service
        logError();
      }
    
    }, [error])

    if(error) {
        // you can render any custom fallback UI
        return <h1>Something went wrong</h1>
    }

    return (
      {...children}
    )
    
}   