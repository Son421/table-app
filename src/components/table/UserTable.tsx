import React, {useEffect} from "react";
import './table.css';
import UserInfo from "../userInfo/UserInfo";
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import { fetchUsers } from "../../features/userSlice";

export default function UserTable(){
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.users.loading);
    const error = useAppSelector(state => state.users.loading);
    const usersArr =  useAppSelector(state => state.users.value);
    const searchedUser = useAppSelector(state => state.users.searchedUser);
    const seacrhing = useAppSelector(state => state.ui.search)

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if(loading){
        return(
            <div className="user-table_loading">
                Data is loading, please be patient
            </div>
        )
    }else if(error){
        return(
            <div className="user-table_error">
                Houston, we have a problems loading data, please reload the page
            </div>
        )
    }else{
        return(
            <div>
                <section className="user-table"> 
                    <div>Name </div> 
                    <div>Username </div> 
                    <div>Email </div> 
                    <div>Phone </div> 
                </section>    
                {seacrhing ? searchedUser.map((user) => (
                    <UserInfo user={user} key={user.id}/>
                )): usersArr.map((user) => (
                    <UserInfo user={user} key={user.id}/>
                ))}   
            </div>
        );
    }
}