import React, {useState} from 'react';
import { TiArrowSortedUp } from "react-icons/ti";
import { useAppDispatch } from '../../hooks/hooks';
import { changeVisibility, stopSearching } from '../../features/uiSlice';
import './menu.css'

export default function Menu(){
    const [shownMenu, setShownMenu] = useState(false);
    const dispatch = useAppDispatch();

    function changeVis (){
        setShownMenu(!shownMenu);
        dispatch(changeVisibility());
        dispatch(stopSearching());
    }

    return(
        <div className='menu'>
            <button onClick={changeVis} className='menu_button'> Search <TiArrowSortedUp className={!shownMenu? `menu--close`: `menu--open` } /> </button>
        </div>
    )
}