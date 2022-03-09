// import React from "react";
// import * as s from "../globalStyles";

// const NavbarCustom = ({ accounts }) => (
//     <s.Navbar>
//         <s.NavbarText float="right" margin={10}>{accounts !== null && accounts[0]}</s.NavbarText>
//     </s.Navbar>
// );

// export default NavbarCustom;

import React from 'react'
import * as n from '../styles/Navbar.style.js'
import logo from '../logo.svg'
import { Outlet } from 'react-router-dom'

const NavbarCustom = ({ accounts }) => (
  <>
    <n.Nav>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <n.NavLink to="/">
          <img
            style={{ width: 50, height: 50, margin: 5 }}
            src={logo}
            alt="Logo StarterKit"
          />
        </n.NavLink>
        <n.NavLink to="/">
          <n.MenuLink>Content</n.MenuLink>
        </n.NavLink>
        <n.NavLink to="Hello">
          <n.MenuLink>Hello</n.MenuLink>
        </n.NavLink>
      </div>
      <n.NavbarAddress margin={10} style={{ color: 'white' }}>
        {accounts !== null && accounts[0]}
      </n.NavbarAddress>
    </n.Nav>
    <Outlet />
  </>
)

export default NavbarCustom