import React, {useEffect} from "react";
import './searchedUser.css';
import UserInfo from "../userInfo/UserInfo";
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import { closePopup } from "../../features/uiSlice";
import { IoClose } from "react-icons/io5";

export default function SearchedUser(){
    const dispatch = useAppDispatch();
    const popupVisibility =  useAppSelector(state => state.ui.popup);
    const searchedUser = useAppSelector(state => state.users.searchedUser);

    if(popupVisibility){
        return(
            <div className="searched-user">
                <button className="searched-user_button" onClick={() => dispatch(closePopup())}> <IoClose/> </button>
                <section className="searched-user_table">
                    {searchedUser.map((user) => (
                        <UserInfo user={user}/>
                    ))}
                </section>
            </div>
        );
    }else return null;
}