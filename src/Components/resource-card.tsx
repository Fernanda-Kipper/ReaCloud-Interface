import React from 'react';
import Avatar from 'react-avatar';
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
    id: string
}

const cardStyles = makeStyles({
    root: {
      width: 300,
      height: 450,
      borderRadius: 10,
      backgroundColor: '#FFF',
      margin: 10,
      position: 'relative',
    },
    media: {
      height: 150,
    },
    action: {
      height: 60,
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
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
      margin: 10,
      maxHeight: 150,
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

    const resumeText = (title: string, len: number) => {
      if(title.length > len){
        let newTitle = title
        .slice(0,len - 1)
        return newTitle += '...'
      }else{
        return title
      }
    }

    return(
      <div className="content-menu">
          <Card className={classes.root}>
            {!!image ? (
              <CardMedia
              className={classes.media}
              image={image}
              title={title}
              />
            ) : <Avatar name={title} size="100%" style={{width: '300px', height: '150px'}}/>}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
              {resumeText(title, 28)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
              {resumeText(description, 150)}
            </Typography>
            <CardActions className={classes.action}>
              <Link to={`/recurso/${id}`} className={classes.link}>Saber mais</Link>
            </CardActions>
          </CardContent>
        </Card>
      </div>
    )
}

export default ResourceCard;