import { makeStyles } from '@material-ui/core/styles';
import Image from '../../asset/g7w3HJ.jpg'

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  container: {
    minHeight: '100vh',
        width: '100vw',
        background: `url(${Image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative'
  },
  content:{
    position:'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
    textAlign: 'center',
     
},
titleContainer:{
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap'
},
title:{
  textAlign: 'center',
  width: '70vw',
  fontFamily:'Corben, cursive',
  // padding: 'auto 1vw',
  fontSize:'calc(4em + 1.7vmin)',
  color: '#fff'
},
btnContainer:{
  marginTop: '3em',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap'
},
  root: {
    flexGrow: 1,
  },
}));