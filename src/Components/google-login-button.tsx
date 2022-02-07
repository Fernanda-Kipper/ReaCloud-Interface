import React from "react";
import { FcGoogle } from "react-icons/fc";
import querystring from "querystring";

import "../Styles/components/google-login-button.css";

interface Props {
  text: string
}

function getGoogleAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: "http://localhost:3000/auth",
    client_id: "909104427753-uccm5f130u3pkukhngf8ng8pfeinc3tn.apps.googleusercontent.com",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  return `${rootUrl}?${querystring.stringify(options)}`;
}

export function GoogleLoginButton(props: Props){
  const onClick = () => {
    const authUrl = getGoogleAuthURL()
    window.location.assign(authUrl)
  }

  return(
    <button onClick={onClick} className="google-button">
      <FcGoogle/>
      {props.text}
    </button>
  )
}