import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

function PrivateRoutes({children}){
    const location = useLocation();
    const currentUser  = useSelector((state) => state.userInfo?.currentUser)
    if(!currentUser){
        return (
            <Navigate to={'/login'} replace={true} state={{ from: location.pathname }}  />
        )
    }
    return children

}
export default PrivateRoutes;