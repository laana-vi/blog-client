import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ path, exact, Component, user }) => {
    return user ?
        <Route exact={exact} path={path}>
            <Component />
        </Route>
        :
        <Redirect to="/login" />
}

export default PrivateRoute