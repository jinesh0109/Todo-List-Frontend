import { useRouteError } from "react-router-dom"

const Error = ()=>{
    const error = useRouteError();
    return(
        <>
            <h1>Oops! The page you are looking for is not present</h1>
            <h3>{error.status} {error.data}</h3>
        </>
    )
}

export default Error