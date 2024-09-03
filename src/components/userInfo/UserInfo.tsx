import React from "react";
import './userInfo.css';

interface userInfo {
    name: string;
    username: string;
    email: string;
    phone: string;
}

export default function UserInfo(props: {user: userInfo}){

    return(
        <div className="user-info">
             <div>
                <span className="user-info_description"> Name: </span>
                <span className="user-info_title"> {props.user.name }</span>
            </div>
            <div>
                <span className="user-info_description"> Username: </span>
                <span> {props.user.username }</span>
            </div>
            <div>
                <span className="user-info_description"> Email: </span>
                <span> {props.user.email }</span>
            </div>
            <div>
                <span className="user-info_description"> Phone: </span>
                <span> {props.user.phone }</span>
            </div>
        </div>
    );
}