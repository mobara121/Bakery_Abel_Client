import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: '5%',
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  checkoutButton: {
    minWidth: '150px',
  },
  updateButton:{
    minWidth: '150px',
  },
  deleteButton:{

},
  link: {
    textDecoration: 'underline',
  },
  icons:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10%',
    width: '100%',
    // justifyContent: 'space-around',
  },
  image:{
      minWidth: '10vw',
      maxWidth: '20px',
      height: '10vh'
  },
  item:{
      height: '10vh',
      margin: '2vh',
      padding: '8px',
      boxShadow: "1px 2px 1px -1px rgba(0, 0, 0, 0.2), 1px 1px 1px 0px rgba(0,0,0,0.14), 1px 1px 3px 0px rgba(0,0,0,0.12)",
      display: 'flex',
      justifyContent: 'space-around',

  },
  detail:{
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    margin: '3vw',
    justifyContent:'space-around'  
  },
  name_qty:{
    margin: 'auto 15px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent:'space-around'
  },
  subtotal:{
      display: 'flex',
      justifyContent:'flex-end'
  },
  itemIcons:{
    display: 'flex',
    flexDirection: 'column'
  }
}));