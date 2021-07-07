import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import "./deleteButton.css";
import axios from "axios";

export default function OtpremnicaNova() {
  const [data, setData] = useState([]);
  const [produktiZaOtpremnicu, setProduktiZaOtpremnicu] = useState([]);
  const [selektovaniProdukt, setSelektovaniProdukt] = useState({});
  const [selektovanaKolicina, setSelektovanaKolicina] = useState();
  const [errorKolicina, setErrorKolicina] = useState(false);
  const [totalPrice, setTotalPrice] = useState();
  const [totalPricePDV, setTotalPricePDV] = useState();
  const [primalac, setPrimalac] = useState("");
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    axios
      .get("/api/produkt")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    return () => {
      setData([]);
    };
  }, []);

  const handleSubmit = () => {
    if (!primalac) {
      return alert("Unesite ime primaoca");
    }
    if (produktiZaOtpremnicu.length < 1) {
      return alert("Dodajte produkte za otpremnicu");
    }
    let dataZaSlanje = {
      produkti: produktiZaOtpremnicu,
      primalac,
      ukupnaCijena: totalPrice,
      ukupnaCijenaPDV: totalPricePDV,
    };
    axios
      .post("/api/otpremnice", dataZaSlanje)
      .then((res) => setFinished(true))
      .catch((err) => console.log(err));
  };

  const handleDeleteItem = (item) => {
    let itemZaAdd = { ...item, kolicina: item.originalnaKolicina };
    let noviData = [itemZaAdd, ...data];
    let noviProduktiZaOtpremnicu = produktiZaOtpremnicu.filter(
      (elem) => elem._id !== item._id
    );
    let total = 0;
    let totalPDV = 0;
    noviProduktiZaOtpremnicu.map(
      (elem) => (total = total + elem.cijena * elem.kolicina)
    );
    noviProduktiZaOtpremnicu.map(
      (elem) => (totalPDV = totalPDV + elem.cijenaPDV * elem.kolicina)
    );
    setData(noviData);
    setProduktiZaOtpremnicu(noviProduktiZaOtpremnicu);
    setTotalPrice(total.toFixed(2));
    setTotalPricePDV(totalPDV.toFixed(2));
  };

  const handleChangeKolicina = (e) => {
    setSelektovanaKolicina(e.target.value);
    if (e.target.value > selektovaniProdukt.kolicina) {
      setErrorKolicina(true);
    } else {
      setErrorKolicina(false);
    }
  };

  const handleChangeProdukt = (element) => {
    setSelektovaniProdukt(element);
    if (selektovanaKolicina > element.kolicina) {
      setErrorKolicina(true);
    } else {
      setErrorKolicina(false);
    }
  };

  const handleAddProduct = () => {
    if (errorKolicina || !selektovanaKolicina) {
      return alert("Greska u kolicini");
    }
    let zaDodati = [
      ...produktiZaOtpremnicu,
      {
        ...selektovaniProdukt,
        kolicina: selektovanaKolicina,
        originalnaKolicina: selektovaniProdukt.kolicina,
      },
    ];
    let dataIzmjena = data.filter(
      (elem) => elem._id !== selektovaniProdukt._id
    );
    let total = 0;
    let totalPDV = 0;
    zaDodati.map((elem) => (total = total + elem.cijena * elem.kolicina));
    zaDodati.map(
      (elem) => (totalPDV = totalPDV + elem.cijenaPDV * elem.kolicina)
    );

    setProduktiZaOtpremnicu(zaDodati);
    setData(dataIzmjena);
    setSelektovaniProdukt({});
    setSelektovanaKolicina("");
    setTotalPrice(total.toFixed(2));
    setTotalPricePDV(totalPDV.toFixed(2));
  };

  return (
    <>
      {finished ? <Redirect to="/otpremnice"></Redirect> : null}
      <div style={{ marginLeft: "5%", marginTop: "50px" }}>
        <TextField
          id="standard-basic"
          label="Primalac"
          value={primalac}
          onChange={(e) => setPrimalac(e.target.value)}
        />
        <br></br>
        <Select
          style={{ marginTop: "70px" }}
          native
          value={selektovaniProdukt.naziv ? selektovaniProdukt.naziv : ""}
        >
          <option></option>
          {data.map((element) => {
            return (
              <option
                value={element.naziv}
                onClick={() => handleChangeProdukt(element)}
              >
                {element.naziv}
              </option>
            );
          })}
        </Select>
        <br></br>
        <TextField
          style={{ marginTop: "15px" }}
          type="number"
          id="standard-basic"
          label="Kolicina"
          helperText={`Maksimalna kolicina: ${
            selektovaniProdukt.kolicina ? selektovaniProdukt.kolicina : ""
          }`}
          value={selektovanaKolicina}
          onChange={handleChangeKolicina}
          error={errorKolicina}
        />
        <br></br>
        <Button color="primary" variant="contained" onClick={handleAddProduct}>
          Dodaj Produkt
        </Button>
      </div>
      <TableContainer
        component={Paper}
        style={{ marginTop: "100px", width: "80%", marginLeft: "10%" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Naziv</TableCell>
              <TableCell align="right">Kolicina</TableCell>
              <TableCell align="right">Cijena</TableCell>
              <TableCell align="right">Cijena sa PDV</TableCell>
              <TableCell align="right">Vrijednost</TableCell>
              <TableCell align="right">Vrijednost sa PDV</TableCell>
              <TableCell align="right">Obrisi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produktiZaOtpremnicu.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell align="right">{row.naziv}</TableCell>
                <TableCell align="right">{row.kolicina}</TableCell>
                <TableCell align="right">{row.cijena}</TableCell>
                <TableCell align="right">{row.cijenaPDV}</TableCell>
                <TableCell align="right">
                  {(row.cijena * row.kolicina).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {(row.cijenaPDV * row.kolicina).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <DeleteIcon
                    className="deleteButton"
                    style={{ fill: "red" }}
                    onClick={() => handleDeleteItem(row)}
                  ></DeleteIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          textAlign: "right",
          marginRight: "10%",
          marginTop: "100px",
          marginBottom: "100px",
        }}
      >
        Ukupna cijena: {totalPrice}
        <br></br>
        Ukupna cijena sa PDV: {totalPricePDV}
        <br></br>
        <Button
          color="primary"
          variant="contained"
          style={{ marginTop: "20px" }}
          onClick={handleSubmit}
        >
          Spremi otpremnicu
        </Button>
      </div>
    </>
  );
}
