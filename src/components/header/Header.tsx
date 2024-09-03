import React from "react";
import Search from "../search/Search";
import Menu from "../menu/Menu";
import './header.css'

export default function Header(){

    return(
        <div className="header">
            Management table 
            <section className="header_search_block">
                <Search/>
                <Menu/>
            </section>
        </div>
    );
}