

export default {
  base: {

    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * 3 },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * 3,
    marginTop: 10,
    padding: 0,
    backgroundColor: '#fafafa',
 
    backgroundColor: 'pink',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    left: 0,
    top: 0,
    right: 0,
    marginTop: 0,
  },
  spinner: {
    color: 'blue',
  },
  optionsButton: {
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'white',
      marginRight:4,
    },
  },
  header: {
    flexDirection: 'row',
    height: 45,
    backgroundColor: '#F42566',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 0,
  },
  left: {
    alignItems: 'flex-start',
    alignSelf: 'center',
    flex: 0.5,
  },
  center: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  right: {
    alignItems: 'flex-end',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 0.5,
  },
  icon: {
    color: 'white',
  },
  sideBarButton: {
    width: 45,
  },
  backButton: {
    width: 45,
  },
  noRight: {
    width: 45,
  },
  notification: {
    icon: {
      width: 45,
    },
    digit: {
      fontSize:  12,
      color: 'white',
      fontFamily: 'bold',
      alignItems: 'center',
    },
    badge: {
      position: 'absolute',
      top: 2.5,
      right: -2.5,
      minWidth: 10,
      height: 10,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1,
      paddingBottom: 1,
      paddingLeft:1,
      paddingRight: 1,
    },
  },
};
