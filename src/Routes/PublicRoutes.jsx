import React from 'react'
import {useSelector ,} from "react-redux";
import {Navigate} from "react-router-dom";

const PublicRoutes = ({children}) => {
    const currentUser = useSelector((state)=> state.userInfo?.currentUser)


    if (currentUser) {

                return <Navigate to="/profile" replace={true} />;
    }
        return children;


}
export default PublicRoutes;
