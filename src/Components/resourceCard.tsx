import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

interface ResourceCardProps{
    title: string,
    image: string,
    description: string,
    id: number
}

const cardStyles = makeStyles({
    root: {
      width: 300,
      height: 350,
      borderRadius: 10,
      backgroundColor: '#FFF',
      margin: 10
    },
    media: {
      height: 150,
    },
    title: {
      fontSize: 25,
      fontWeight: 500,
      textAlign: 'center',
      fontFamily: 'sans-serif'
    },
    text: {
      fontSize: 15,
      fontWeight: 300,
      textAlign: 'center',
      fontFamily: 'sans-serif',
      margin: 10
    },
    link: {
      textAlign: 'center',
      fontFamily: 'sans-serif',
      textDecoration: 'none',
      alignSelf: 'center'
    }
  });

const ResourceCard: React.FunctionComponent< ResourceCardProps > = ({title, image, description, id})=>{
    const classes = cardStyles();
    return(
      <div className="content-menu">
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image={image}
              title={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
              {description}
            </Typography>
            <CardActions>
              <Link to={`/recurso/${id}`} className={classes.link}>Saber mais</Link>
            </CardActions>
          </CardContent>
        </Card>
      </div>
    )
}

export default ResourceCard;