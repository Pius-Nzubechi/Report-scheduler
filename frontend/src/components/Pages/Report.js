import React, { useEffect } from "react";
import axios from "axios";

function Report() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    axios
      .get("https://report-schedule-api.herokuapp.com")
      .then((res) => {
        setData(res.data);
        setLoading(true);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [loading]);

  const handleDelete = (id) => {
    axios
      .delete(`https://report-schedule-api.herokuapp.com/${id}`)
      .then((res) => {
        if (res.status === 200) window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const report = data.map((item) => (
    <div key={item._id} className="card">
      <div className="card-body">
        <h5 className="card-title">{item.email}</h5>
        <p className="card-text">{item.subject}</p>
        <small>{item.schedule}</small>

        <button
          className="m-2 btn-danger"
          onClick={() => handleDelete(item._id)}
        >
          {" "}
          Delete
        </button>
      </div>
    </div>
  ));
  return <React.Fragment>{loading ? report : "Loading"}</React.Fragment>;
}

export default Report;
