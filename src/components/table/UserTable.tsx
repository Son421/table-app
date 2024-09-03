import React, {useEffect} from "react";
import './table.css';
import UserInfo from "../userInfo/UserInfo";
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import { fetchUsers } from "../../features/userSlice";

export default function UserTable(){
    const dispatch = useAppDispatch();
    const usersArr =  useAppSelector(state => state.users.value);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return(
        <div className="user-table">
            {usersArr.map((user) => (
                <UserInfo user={user}/>
            ))}
        </div>
    );
}