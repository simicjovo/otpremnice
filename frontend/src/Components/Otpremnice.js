import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import PictureAsPdf from "@material-ui/icons/PictureAsPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OtpremnicaPDF from "./OtpremnicaPDF";
import "./deleteButton.css";
import axios from "axios";

export default function Otpremnice() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/otpremnice")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    return () => {
      setData([]);
    };
  }, []);

  const handleDeleteItem = (id) => {
    axios
      .delete(`/api/otpremnice/${id}`)
      .then((res) => {
        let noviData = data.filter((elem) => elem._id !== id);
        setData(noviData);
        alert("Uspjesno obrisano");
      })
      .catch((err) => alert("Greska"));
  };
  return (
    <div>
      <TableContainer
        component={Paper}
        style={{ marginTop: "100px", width: "80%", marginLeft: "10%" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Primalac</TableCell>
              <TableCell align="right">Komercijalista</TableCell>
              <TableCell align="right">Ukupna cijena</TableCell>
              <TableCell align="right">Ukupna cijena PDV</TableCell>
              <TableCell align="right">Datum</TableCell>
              <TableCell align="right">Obrisi</TableCell>
              <TableCell align="right">PDF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell align="right">{row.primalac}</TableCell>
                <TableCell align="right">{row.komercijalista.name}</TableCell>
                <TableCell align="right">{row.ukupnaCijena}</TableCell>
                <TableCell align="right">{row.ukupnaCijenaPDV}</TableCell>
                <TableCell align="right">
                  {new Date(row.datum).toLocaleDateString("de-DE")}
                </TableCell>
                <TableCell align="right">
                  <DeleteIcon
                    className="deleteButton"
                    style={{ fill: "red" }}
                    onClick={() => handleDeleteItem(row._id)}
                  ></DeleteIcon>
                </TableCell>
                <TableCell align="right">
                  <PDFDownloadLink
                    document={<OtpremnicaPDF data={row}></OtpremnicaPDF>}
                    fileName="otpremnica.pdf"
                  >
                    <PictureAsPdf
                      className="deleteButton"
                      style={{ fill: "blue" }}
                    ></PictureAsPdf>
                  </PDFDownloadLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/otpremnice/nova">
        <Fab
          color="primary"
          aria-label="add"
          style={{
            bottom: "30px",
            right: "40px",
            position: "absolute",
            width: "6rem",
            height: "6rem",
          }}
        >
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
}
