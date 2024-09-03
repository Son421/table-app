import React, {useState} from 'react';
import { TiArrowSortedUp } from "react-icons/ti";
import {searchByEmail, searchByName, searchByPhone, searchByUsername, setSearchType } from '../../features/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import './menu.css'

export default function Menu(){
    const [shownMenu, setShownMenu] = useState(false);
    const searchedText = useAppSelector(state => state.users.searchedText);
    const searchedType = useAppSelector(state => state.users.searchType);
    const dispatch = useAppDispatch();

    function showMenu(){
        setShownMenu(!shownMenu);
    }

    function sortByName(){
        dispatch(searchByName(searchedText));
        dispatch(setSearchType('name'));
    }

    function sortByUserName(){
        dispatch(searchByUsername(searchedText));
        dispatch(setSearchType('username'));
    }

    function sortByPhone(){
        dispatch(searchByPhone(searchedText));
        dispatch(setSearchType('phone'));
    }

    function sortByEmail(){
        dispatch(searchByEmail(searchedText));
        dispatch(setSearchType('email'));
    }

    if(!shownMenu){
        return(
            <div className='menu'>
                <button onClick={showMenu} className='menu_button'> Search by {searchedType}<TiArrowSortedUp className='menu--close' /> </button>
            </div>
        )
    }else{
        return(
            <div className='menu'>
                <button onClick={showMenu} className='menu_button menu_button_active'> Search by {searchedType}<TiArrowSortedUp className='menu--open'/> </button>
                <button className='menu_button menu_option' onClick={sortByName}> Name </button>
                <button className='menu_button menu_option' onClick={sortByUserName}> Username </button>
                <button className='menu_button menu_option' onClick={sortByEmail}> Email </button>
                <button className='menu_button menu_option' onClick={sortByPhone}> Phone </button>
            </div>
        )
    }
    
}