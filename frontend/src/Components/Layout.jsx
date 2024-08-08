import React from "react";
import { Sidebar, TopBar } from './'; 
import '../App.css';

const Layout = ({ children }) => {
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
