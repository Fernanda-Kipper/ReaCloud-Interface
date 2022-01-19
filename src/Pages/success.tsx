import React from "react";

import "../Styles/pages/success.css";

import { GoToHomeButton } from "../Components/go-to-home-button";
import Header from "../Components/header";
import { SuccessIcon } from "../Components/icons/success-icon";

export default function SuccessPage(){
  return(
    <div className="success-page-content">
      <Header/>
      <h1>Uhull!</h1>
      <h2>concluído com sucesso</h2>
      <SuccessIcon />
      <GoToHomeButton />
    </div>
  )
}