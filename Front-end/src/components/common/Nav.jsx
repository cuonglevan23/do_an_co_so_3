import React, { useRef, useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";

// icon
import { AiFillHome, AiOutlineQrcode } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { SiMessenger } from "react-icons/si";
import { RiSpaceShipFill } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import { BsFillSunFill, BsMoon } from "react-icons/bs";

// components
import { useAppContext } from "../../context/useContext.js";
import { Dropdown, ItemsList } from "../";

// hocks
import useDebounce from "../../hooks/useDebounce";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import ReactLoading from "react-loading";
const Nav = () => {
      const { dark, setOneState, user, openQrCode, autoFetch} = useAppContext();
     
     //text state
     const [text, setText] = useState("");

     // when people stop typing (delay 500ms), then will call api
     const textDeounce = useState(text,500);
     // receve data from useEffect 
     const [listSearchResult, setListSearchResult] = useState([]);
     // list empty 
     const [isEmpty, setIsEmpty] = useState(false);
     // loading
     const [loading, setLoading] = useState(false);

     const clearListResult = () => {
      setListSearchResult([]);
      setText("");
      setIsEmpty(false);
     };

     const searchRef = useRef();
     useOnClickOutside(searchRef, () => clearListResult());

     useEffect( () => {
      if (textDeounce){
            searchPeople();
      }
     }, [textDeounce]);

     const searchPeople = async () => {
      setLoading(true);
      if(!text){
            return;
      }
      try{
            const { data } = await autoFetch.get(`/api/auth/search-user/${text}`);
            if(data.search.length == 0){
                  setIsEmpty(true);
                  setListSearchResult([]);

            }else {
                  setIsEmpty(false);
                  setListSearchResult(data.search);
            }
      }catch(error){
            console.log(error);
      }
      setLoading(false);
     };

      return (
            {

            }

      );
};
export default Nav;