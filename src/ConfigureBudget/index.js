import Budegets from './Budegets.js';
import { connect } from 'react-redux';
import {
  mapDispatchToProps,
  mapStateToProps,
} from './props';
export default connect(mapStateToProps, mapDispatchToProps)(Budegets);