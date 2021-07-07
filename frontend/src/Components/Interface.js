import React from "react";
import { Link } from "react-router-dom";

export default function Interface() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "100px",
      }}
    >
      <Link to="/skladiste">
        <button>Skladiste</button>
      </Link>
      <Link to="/otpremnice">
        <button>Otpremnice</button>
      </Link>
      <Link to="/servisi">
        <button>Servisi</button>
      </Link>
    </div>
  );
}
