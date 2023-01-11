import React from "react";
import logo from '../assets/cropped.jpeg'
import './login.css'

// href="https://gymkhana.iitb.ac.in/profiles/oauth/authorize/?client_id=0eo7GWH5u9yizZz3ZjzMreaDhLJJfAno2PvkhG34&response_type=code&scope=profile picture ldap program&redirect_uri=http://localhost:3000/auth"

export default function Login(){
    return(
        // <Button variant="contined" color="success"> SSO Login </Button>
        <div className="outer" >
            <div className="inner">
                <img className="logo" src={logo} alt='logo' /><br/>
                <button className="btn btn-success login-button"><a className="button-text" href="https://gymkhana.iitb.ac.in/profiles/oauth/authorize/?client_id=0eo7GWH5u9yizZz3ZjzMreaDhLJJfAno2PvkhG34&response_type=code&scope=profile picture ldap program&redirect_uri=http://localhost:3000/auth">Login to SSO</a></button>
            </div>
        </div>
    )
}
