import React, { useState } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import "./App.css";
import HistoryVisitUrl from "./components/HistoryVisitUrl";

function App() {
  const [shortUrl, setShortUrl] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [qrValue, setQrValue] = useState("");

  const onSubmitUrl = async () => {
    const url = await axios.post("http://localhost:5000/api/url", {
      destination: shortUrl,
    });
    setNewUrl(`http://localhost:5000/api/${url.data.data.shortId}`);
    setQrValue(newUrl);
    console.log({ newUrl });
    setShortUrl("");
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${qrValue.png}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  return (
    <div className="app">
      <div className="right">
        <HistoryVisitUrl />
      </div>
      <div className="left">
        <div className="form-group">
          <label htmlFor="shortUrl">Plz fill link url</label>
          <input
            type="text"
            name="shortUrl"
            onChange={(e) => setShortUrl(e.target.value)}
          />
          <button onClick={onSubmitUrl}>create url</button>
          <a href={newUrl} className="newUrl">
            {newUrl}
          </a>
        </div>
        {newUrl && (
          <div className="">
            <QRCode
              id="qr-gen"
              value={qrValue}
              size={280}
              level={"H"}
              includeMargin={true}
            />
            <div style={{ marginLeft: "2.8rem" }}>
              click for
              <button
                type="button"
                style={{ fontSize: "12px", marginLeft: "5px" }}
                onClick={downloadQRCode}
              >
                download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
