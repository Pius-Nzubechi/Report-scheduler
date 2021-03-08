import React, { Component } from 'react'
import reportImg from "../assets/report2.jpg";

class Image extends Component {
    render() { 
        return (
            <div className="col-sm-7">
            <img
              className="img-fluid w-50 img-responsive"
              style={{
                marginLeft: "800px",
                marginTop: "-500px",
              }}
              src={reportImg}
              alt=""
            />
          </div>
          );
    }
}
 
export default Image;
