import React from 'react'

import { CircularProgress } from '@material-ui/core'

import '../Styles/components/loading-spinner-w-title.css'

interface Props {
  title: string
}

export function LoadingSpinnerWithTitle({ title }: Props){
  return(
    <div className='spinner-wrapper'>
      <h2 className='spinner-title'>{title}</h2>
      <CircularProgress color="primary" size={40} />
    </div>
  )
}