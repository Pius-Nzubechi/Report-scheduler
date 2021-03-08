import React, { Component } from "react";
import axios from "axios";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate if form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class ReportForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: "null",
      email: null,
      subject: null,
      schedule: null,
      loading: false,
      formErrors: {
        // file: "",
        email: "",
        subject: "",
        schedule: "",
      },
    };
  }

  // Uploading file
  uploadDocument = (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("upload_preset", "cipher");
    data.append("file", file);
    this.setState({
      ...this.state,
      loading: true,
    });

    axios
      .post("https://api.cloudinary.com/v1_1/dos6ec8wr/image/upload", data)
      .then((res) => {
        this.setState({
          ...this.state,
          file: res.data.secure_url,
        });

        console.log(this.state.file);

        if (res.status === 200) {
          console.log("File Uploaded Successfully");
        } else {
          console.log("Upload failed!!");
        }
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      const data = {
        subject: this.state.subject,
        email: this.state.email,
        file: this.state.file,
        schedule: this.state.schedule,
      };
      axios
        .post("https://report-schedule-api.herokuapp.com", data)
        .then((res) => alert("Submit Successful"))
        .catch((err) => console.log(err));
    } else {
      alert("Invalid form fields");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "subject":
        formErrors.subject =
          value.length < 3 ? "minimum of 5 characters required" : "";
        break;
      case "email":
        formErrors.email =
          emailRegex.test(value) && value.length > 4 ? "" : "invalid Email";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (

      <React.Fragment>
        <div className="wrapper col-lg-8" style={{ margin: "20px" }}>
          <div className="form-wrapper">
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="mb-3" onChange={this.handleChange}>
                <label htmlFor="formFile" className="form-label">
                  Report
                </label>
                <input
                  className="form-control"
                  type="file"
                  onChange={this.uploadDocument}
                  id="formFile"
                />
              </div>
              <div className="subject">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  className=""
                  placeholder="Subject"
                  name="subject"
                  onChange={this.handleChange}
                  noValidate
                />
                {formErrors.subject.length > 0 && (
                  <span className="errorMessage">{formErrors.subject}</span>
                )}
              </div>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className=""
                  placeholder="Email"
                  name="email"
                  onChange={this.handleChange}
                  noValidate
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
              <div className="schedule">
                <label htmlFor="schedule">Schedule</label>
                <select
                  onChange={this.handleChange}
                  name="schedule"
                  className="schedule"
                >
                 <option value="none" selected disabled hidden> Select</option>
                  <option value="Immediately">Immediately</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <div className="sendReport">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ReportForm;
