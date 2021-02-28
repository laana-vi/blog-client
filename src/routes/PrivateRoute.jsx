import { Route, Redirect } from 'react-router-dom';
import { token } from '../service';

const PrivateRoute = ({ path, exact, Component }) => {
    return token ?
        <Route exact={exact} path={path}>
            <Component />
        </Route>
        :
        <Redirect to="/login" />
}

export default PrivateRoute