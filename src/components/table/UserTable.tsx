import React, {useEffect} from "react";
import './table.css';
import UserInfo from "../userInfo/UserInfo";
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import { fetchUsers } from "../../features/userSlice";

export default function UserTable(){
    const dispatch = useAppDispatch();
    const usersArr =  useAppSelector(state => state.users.value);
    const searchedUser = useAppSelector(state => state.users.searchedUser);
    const seacrhing = useAppSelector(state => state.ui.search)


    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return(
        <div>
            <section className="user-table"> 
                <div>Name </div> 
                <div>Username </div> 
                <div>Email </div> 
                <div>Phone </div> 
            </section>    
            {seacrhing ? searchedUser.map((user) => (
                <UserInfo user={user}/>
            )): usersArr.map((user) => (
                <UserInfo user={user}/>
            ))}   
        </div>
    );
}