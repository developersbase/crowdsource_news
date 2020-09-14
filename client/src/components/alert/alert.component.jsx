import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div className="p-10 flex flex-col space-y-3">
      <div
        key={alert.id}
        className={`p-5 w-full sm:w-1/2 border-l-4 ${alert.alertType}`}
      >
        <div className="flex space-x-3">
          <i className={`fas fa-${alert.alertIcon}`}></i>
          <div className="flex-1 leading-tight text-sm">{alert.message}</div>
        </div>
      </div>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
