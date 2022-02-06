import React from "react";
import { LogoBackground } from "../Components/icons/logo-background";
import { LogoForeground } from "../Components/icons/logo-foreground";

import "../Styles/pages/loading.css";

export function LoadingPage(){
  return(
    <section className="app-loading" data-testid="app-loading">
      <div className="app-loading__logo-container">
        <LogoBackground />
        <div className="app-loading__logo-container__control"/>
        <LogoForeground />
      </div>
    </section>
  )
}