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
import "./deleteButton.css";
import axios from "axios";

export default function Skladiste() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/produkt")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    return () => {
      setData([]);
    };
  }, []);

  const handleDeleteItem = (id) => {
    axios
      .delete(`/api/produkt/${id}`)
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
              <TableCell align="right">Naziv</TableCell>
              <TableCell align="right">Kolicina</TableCell>
              <TableCell align="right">Cijena</TableCell>
              <TableCell align="right">Cijena sa PDV</TableCell>
              <TableCell align="right">Obrisi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  <Link to={`/skladiste/${row._id}`}>{row._id}</Link>
                </TableCell>
                <TableCell align="right">{row.naziv}</TableCell>
                <TableCell align="right">{row.kolicina}</TableCell>
                <TableCell align="right">{row.cijena}</TableCell>
                <TableCell align="right">{row.cijenaPDV}</TableCell>
                <TableCell align="right">
                  <DeleteIcon
                    className="deleteButton"
                    style={{ fill: "red" }}
                    onClick={() => handleDeleteItem(row._id)}
                  ></DeleteIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/skladiste/noviProdukt">
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
