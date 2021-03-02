import { Redirect } from "react-router-dom"

const BasicRoute = ({ user }) => {
    return (
        <>
            <Redirect to="home" />
        </>
    )
}

export default BasicRoute