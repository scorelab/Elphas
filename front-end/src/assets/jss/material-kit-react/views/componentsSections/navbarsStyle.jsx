import { container, title } from "assets/jss/material-kit-react.jsx";
import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

const navbarsStyle = theme => ({

  section: {
    padding: "70px 0",
    paddingTop: "0"
  },
  container,
  title: {
    ...title,
    marginTop: "30px",
    maxHeight: "10px",
    textDecoration: "none"
  },
  navbar: {
      paddingTop:"0",
    marginBottom: "-20px",
    zIndex: "100",
    position: "relative",
    overflow: "hidden",
    "& header": {
      borderRadius: "0"
    }
  },
  navigation: {
    paddingTop:"0",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    marginTop: "0",
    minHeight: "740px"
  },
  formControl: {
    margin: "0 !important",
    paddingBottom: "0",
      paddingTop:"0",
  },
  inputRootCustomClasses: {
    margin: "0!important",
      paddingTop:"0",
  },
  searchIcon: {
    width: "20px",
    height: "20px",
    color: "inherit",
      paddingTop:"0",
  },
  ...headerLinksStyle(theme),
  img: {
    width: "40px",
    height: "40px",
    borderRadius: "50%"
  },
  imageDropdownButton: {
    padding: "0px",
    borderRadius: "50%",
    marginLeft: "5px"
  }
});

export default navbarsStyle;
