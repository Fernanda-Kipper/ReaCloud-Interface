import React from "react";
import { BsArrowDownCircle, BsCheck2Circle } from 'react-icons/bs';

import When from "../when";
import "../../Styles/components/collapsed-section.css";

interface Props {
  isComplete: boolean
  handleClick(value: string): void
  title: string
  section: string
}

export function CollapsedSection({ isComplete, handleClick, title, section }: Props){
  return(
    <div className="collapsed-section">
      <h3 className="section-title">{title}</h3>
      <button 
        className="collapse-button" 
        onClick={() => handleClick(section)}>
          <When expr={isComplete}>
            <BsCheck2Circle color="#43DFA8" size="30px"/>
          </When>
          <When expr={!isComplete}>
            <BsArrowDownCircle color="#afafaf" size="30px"/>
          </When>
      </button>
    </div>
  )
}