import React from "react"

import "../Styles/pages/plugin-manager.css"

import Header from "../Components/header"
import PluginDashboard from "../Components/plugin-dashboard"

export default function PluginManager(){
  return(
    <div className='plugin-content'>
      <Header />
      <main>
        <p className="description">Aqui estão todos materiais que você salvou no plugin</p>
        <PluginDashboard />
      </main>
    </div>
  )
}