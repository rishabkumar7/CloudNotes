import React from "react"
import { Link } from "gatsby"
import ThemeChanger from "../components/themeChanger"
import SocialLinks from "../components/socialLinks"

export default (props) => (
  <nav className="navigation">
    <SocialLinks />
    <ThemeChanger />
  </nav >

)