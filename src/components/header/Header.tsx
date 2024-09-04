import React from "react";
import Menu from "../menu/Menu";
import './header.css'

export default function Header(){

    return(
        <div className="header">
            Management table 
            <Menu/>
        </div>
    );
}