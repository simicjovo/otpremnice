import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function EditProdukt(props) {
  const [naziv, setNaziv] = useState("");
  const [kolicina, setKolicina] = useState(0);
  const [cijena, setCijena] = useState(0);
  const [PDV, setPDV] = useState(0);
  const [finished, setFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    axios.get(`/api/produkt/${id}`).then((res) => {
      setNaziv(res.data.naziv);
      setKolicina(res.data.kolicina);
      setCijena(res.data.cijenaPDV);
      setPDV(res.data.cijena);
      setIsLoading(false);
    });
    return () => {
      setNaziv("");
      setKolicina(0);
      setCijena(0);
      setPDV(0);
      setIsLoading(true);
    };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .put(`/api/produkt/${id}`, { naziv, kolicina, cijenaPDV: cijena })
      .then((res) => setFinished(true))
      .catch((err) => console.log(err));
  };

  const handleCijenu = (e) => {
    setCijena(e.target.value);
    setPDV((e.target.value / 1.17).toFixed(2));
  };

  if (isLoading) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
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
        Izmijeni produkt
      </Button>
    </div>
  );
}
