import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
    const { user, isLoading } = useContext(AuthContext);

    return (
        <Route {...rest}>
            {!isLoading ? (
                user !== null ? (
                    children
                ) : (
                    <Redirect to={"/"} />
                )
            )
                : (<Redirect to={"/login"}/>)
            }
        </Route>
    );
}

export default PrivateRoute;