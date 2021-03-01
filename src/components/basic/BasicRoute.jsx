import { Redirect } from "react-router-dom"

const BasicRoute = ({user}) => {
    return(
        <>
        {user ? <Redirect to="/blog"/> : <Redirect to="/login"/> }
        </>
    )
}

export default BasicRoute