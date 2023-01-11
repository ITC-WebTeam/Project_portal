import React from "react";
import { Button } from "@mui/material";

export default function Login(){
    return(
        <Button href="https://gymkhana.iitb.ac.in/profiles/oauth/authorize/?client_id=0eo7GWH5u9yizZz3ZjzMreaDhLJJfAno2PvkhG34&response_type=code&scope=profile picture ldap program&redirect_uri=http://localhost:3000/auth">SSO Login</Button>
    )
}