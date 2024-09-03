import React, {useState, useEffect} from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {searchByEmail, searchByName, searchByPhone, searchByUsername } from '../../features/userSlice';
import { openPopup, closePopup } from "../../features/uiSlice";
import { setSearchedText } from "../../features/userSlice";
import './search.css';

export default function Search(){
    const [searchText, setSearchText] = useState<string>('');
    const searchedType = useAppSelector(state => state.users.searchType);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(setSearchedText(searchText));
        search();
    },[searchText]);

    function search(){
        switch (searchedType) {
            case 'name':
                dispatch(searchByName(searchText));
                break;
            case 'username':
                dispatch(searchByUsername(searchText));
                break;
            case 'email':
                dispatch(searchByEmail(searchText));
                break;
            case 'phone':
                dispatch(searchByPhone(searchText));
                break;
            default:
                break;
        }
    } 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value;
        setSearchText(value);
        if(value.split('').length == 0){
            dispatch(closePopup());
        }else{
            dispatch(openPopup());
        }
    }

    return(
        <div className="search">
           <form onSubmit={(e) => e.preventDefault()} className="search_form">
                <div className="search_icon">
                    <PiMagnifyingGlassBold/>
                </div>
                <input onChange={handleChange} type="text" className="search_input" name="searchText" value={searchText}></input>
           </form>
        </div>
    );
}