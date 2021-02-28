import { Redirect } from "react-router-dom"
import { token } from "../../service"

const BasicRoute = () => {
    return(
        <>
        {token ? <Redirect to="/home"/> : <Redirect to="/login"/>}
        </>
    )
}

export default BasicRoute