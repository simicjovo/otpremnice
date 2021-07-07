import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function NoviProdukt() {
  const [naziv, setNaziv] = useState("");
  const [kolicina, setKolicina] = useState();
  const [cijena, setCijena] = useState();
  const [PDV, setPDV] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/api/produkt", { naziv, kolicina, cijenaPDV: cijena })
      .then((res) => setFinished(true))
      .catch((err) => console.log(err));
  };

  const handleCijenu = (e) => {
    setCijena(e.target.value);
    setPDV((e.target.value / 1.17).toFixed(2));
  };
  return (
    <div style={{ marginLeft: "5%", marginTop: "50px" }}>
      {finished ? <Redirect to="/skladiste"></Redirect> : null}
      <TextField
        id="standard-basic"
        label="Naziv"
        onChange={(e) => setNaziv(e.target.value)}
        value={naziv}
      />
      <br></br>
      <TextField
        id="standard-basic"
        label="Kolicina"
        onChange={(e) => setKolicina(e.target.value)}
        value={kolicina}
      />
      <br></br>
      <TextField
        id="standard-basic"
        label="Cijena"
        type="number"
        value={cijena}
        onChange={handleCijenu}
      />
      <br></br>
      <TextField disabled value={PDV} label="Cijena bez PDV" />
      <br></br>
      <Button
        color="primary"
        variant="contained"
        style={{ marginTop: "20px", marginLeft: "75px" }}
        onClick={handleSubmit}
      >
        Dodaj produkt
      </Button>
    </div>
  );
}
