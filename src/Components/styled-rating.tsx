import React  from 'react';

import { Rating } from '@material-ui/lab';
import SchoolIcon from '@material-ui/icons/School';
import { withStyles } from '@material-ui/core';

const StyledRating = withStyles({
    iconFilled: {
      color: 'var(--purple-primary)',
    }
})(Rating);

interface RateProps{
    value: number
    size?: 'large' | 'medium' | 'small'
}

function StyledRate(props: RateProps){
    return(
        <StyledRating 
            name="rate" 
            value={props.value} 
            icon={<SchoolIcon fontSize={props.size ?? 'large'}/>} 
            readOnly
        />
    )
}

export default StyledRate;