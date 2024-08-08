import React, { useEffect }from "react";
import { Sidebar, TopBar } from './'; 
import '../App.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userOn } from "../auth/Authslice"

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(userOn());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/login");
        }
    }, [isError, navigate]);

    return (
        <div className="flex h-screen">
            <Sidebar className="sidebar" />
            <div className="flex flex-col flex-grow">
                <TopBar className="topbar" />
                <div className="flex-grow p-4 bg-gray-100 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
