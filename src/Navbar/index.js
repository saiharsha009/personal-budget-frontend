import Navbar from "./Navbar";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStatetoProps,
} from './props';
export default connect(mapStatetoProps, mapDispatchToProps)(Navbar);