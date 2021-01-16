import React  from 'react';

import { Rating } from '@material-ui/lab';
import SchoolIcon from '@material-ui/icons/School';
import { withStyles } from '@material-ui/core';

const StyledRating = withStyles({
    iconFilled: {
      color: '#277496',
    }
})(Rating);

interface RateProps{
    value: number
}

function StyledRate(props: RateProps){
    return(
        <StyledRating name="rate" value={props.value} icon={<SchoolIcon fontSize="large"/>} readOnly/>
    )
}

export default StyledRate;