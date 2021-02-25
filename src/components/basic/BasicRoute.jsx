import { Redirect } from "react-router-dom"

const BasicRoute = ({user}) => {
    return(
        <>
        {user ? <Redirect to="/home"/> : <Redirect to="/login"/>}
        </>
    )
}

export default BasicRoute