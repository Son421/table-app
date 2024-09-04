import React, {useState, useEffect} from "react";
import './searchForm.css';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import { closePopup, searching, stopSearching } from "../../features/uiSlice";
import { IoClose } from "react-icons/io5";
import { searchUsers } from "../../features/userSlice";

interface userInfo {
    name: string;
    username: string;
    email: string;
    phone: string;
    id: number;
}

export default function SearchForm(){
    const dispatch = useAppDispatch();
    const popupVisibility =  useAppSelector(state => state.ui.popup);
    const [searchText, setSearchText] = useState<userInfo>({
        name: '',
        username: '',
        email: '',
        phone: '',
        id: 0,
    })

    useEffect(()=>{
        if(isAllFieldsEmpty(searchText)){
            dispatch(stopSearching());
        }
        dispatch(searchUsers(searchText));
    },[searchText]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value;
        setSearchText({
            ...searchText,
            [e.target.name]: value
        });
        if(value.split('').length !== 0){
            dispatch(searching());
        }
    }

    function isAllFieldsEmpty(obj: userInfo): boolean {
        return Object.values(obj).every(value => value === '');
    }

    if(popupVisibility){
        return(
            <div className="search-form">
                <button className="search-form_button" onClick={() => dispatch(closePopup())}> <IoClose/> </button>
                Search By...
                <form onSubmit={(e) => e.preventDefault()} className="search-form_form">
                    <input onChange={handleChange} type="text" className="search_input" name="name" value={searchText.name} placeholder="Name"></input>
                    <input onChange={handleChange} type="text" className="search_input" name="username" value={searchText.username} placeholder="Username"></input>
                    <input onChange={handleChange} type="text" className="search_input" name="email" value={searchText.email} placeholder="Email"></input>
                    <input onChange={handleChange} type="text" className="search_input" name="phone" value={searchText.phone} placeholder="Phone"></input>
                </form>
            </div>
        );
    }else return null;
}