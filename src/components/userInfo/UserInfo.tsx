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
                {props.user.name }
            </div>
            <div>
                {props.user.username }
            </div>
            <div>
                {props.user.email }
            </div>
            <div>
                {props.user.phone }
            </div>
        </div>
    );
}