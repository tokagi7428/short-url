import React, { useState, useEffect } from "react";
import axios from "axios";

function HistoryVisitUrl() {
  const [historyUrl, setHistoryUrl] = useState([]);
  useEffect(() => {
    const getHistoryUrl = async () => {
      const data = await axios.get("http://localhost:5000/api/url/analytics");
      setHistoryUrl(data.data);
      //   console.log(historyUrl);
    };
    getHistoryUrl();
  }, [historyUrl]);
  return (
    <div>
      <table className="table">
        <tr>
          <th>Destiny</th>
          <th>Link local</th>
          <th>visit count</th>
        </tr>

        {historyUrl.map((item) => (
          <tr className="text-history" key={item._id}>
            <td>{item.destination}</td>
            <td>
              <a href={"http://localhost:5000/api/" + item.shortId}>Link</a>
            </td>
            <td>{item.countUrl}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default HistoryVisitUrl;
