import React from "react"

import "../Styles/pages/plugin-manager.css"

import Header from "../Components/header"
import PluginDashboard from "../Components/plugin-dashboard"
import { EXTENSION_URL } from '../config';

export default function PluginManager(){
  return(
    <div className='plugin-content'>
      <Header />
      <main>
        <p className="description">Aqui ficarão todos os materiais que você salvar no através do  
          <a href={EXTENSION_URL} target="_blank" rel="noopener"> Plugin</a>
        </p>
        <PluginDashboard />
      </main>
    </div>
  )
}