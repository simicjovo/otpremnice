import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";

export default function OtpremnicaPDF(props) {
  return (
    <Document>
      <Page size="A4">
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10%",
            }}
          >
            <View
              style={{
                marginLeft: "5%",
                border: "1px",
                borderColor: "black",
                padding: "15px",
                width: "42%",
                fontSize: "12",
              }}
            >
              <Text>Racun-Otpremnica ID:</Text>
              <Text>{props.data._id}</Text>
              <Text>
                Datum izdavanja:{" "}
                {new Date(props.data.datum).toLocaleDateString("de-DE")}
              </Text>
              <Text>Komercijalista: {props.data.komercijalista.name}</Text>
            </View>
            <View
              style={{
                marginRight: "5%",
                border: "1px",
                borderColor: "black",
                padding: "15px",
                width: "42%",
                textAlign: "center",
              }}
            >
              <Text>{props.data.primalac}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              fontSize: "10",
              marginLeft: "5.5%",
              marginTop: "25px",
            }}
          >
            <View style={{ border: "1px", width: "30px", marginRight: "-1px" }}>
              <Text>R.b.</Text>
            </View>
            <View
              style={{ border: "1px", width: "155px", marginRight: "-1px" }}
            >
              <Text>Naziv</Text>
            </View>
            <View style={{ border: "1px", width: "50px", marginRight: "-1px" }}>
              <Text>Kolicina</Text>
            </View>
            <View style={{ border: "1px", width: "50px", marginRight: "-1px" }}>
              <Text>Cijena</Text>
            </View>
            <View style={{ border: "1px", width: "50px", marginRight: "-1px" }}>
              <Text>PDV</Text>
            </View>
            <View style={{ border: "1px", width: "50px", marginRight: "-1px" }}>
              <Text>Iznos PDV-a</Text>
            </View>
            <View style={{ border: "1px", width: "50px", marginRight: "-1px" }}>
              <Text>Cijena sa PDV</Text>
            </View>
            <View style={{ border: "1px", width: "50px", marginRight: "-1px" }}>
              <Text>Vrijednost</Text>
            </View>
            <View style={{ border: "1px", width: "50px", marginRight: "-1px" }}>
              <Text>Vrijednost sa PDV</Text>
            </View>
          </View>
          {props.data.produkti.map((elem, index) => {
            return (
              <View
                key={elem._id}
                style={{
                  flexDirection: "row",
                  fontSize: "10",
                  marginLeft: "5.5%",
                  marginTop: "2px",
                }}
              >
                <View style={{ width: "30px", marginRight: "-1px" }}>
                  <Text>{index + 1}</Text>
                </View>
                <View style={{ width: "155px", marginRight: "-1px" }}>
                  <Text>{elem.produkt.naziv}</Text>
                </View>
                <View style={{ width: "50px", marginRight: "-1px" }}>
                  <Text>{elem.kolicina}</Text>
                </View>
                <View style={{ width: "50px", marginRight: "-1px" }}>
                  <Text>{elem.produkt.cijena}</Text>
                </View>
                <View style={{ width: "50px", marginRight: "-1px" }}>
                  <Text>17.00</Text>
                </View>
                <View style={{ width: "50px", marginRight: "-1px" }}>
                  <Text>
                    {(elem.produkt.cijenaPDV - elem.produkt.cijena).toFixed(2)}
                  </Text>
                </View>
                <View style={{ width: "50px", marginRight: "-1px" }}>
                  <Text>{elem.produkt.cijenaPDV}</Text>
                </View>
                <View style={{ width: "50px", marginRight: "-1px" }}>
                  <Text>
                    {(elem.produkt.cijena * elem.kolicina).toFixed(2)}
                  </Text>
                </View>
                <View style={{ width: "50px", marginRight: "-1px" }}>
                  <Text>
                    {(elem.produkt.cijenaPDV * elem.kolicina).toFixed(2)}
                  </Text>
                </View>
              </View>
            );
          })}
          <View
            style={{
              marginLeft: "45%",
              flexDirection: "row",
              borderBottom: "1px",
              marginRight: "5%",
              fontSize: "12",
              marginTop: "25px",
            }}
          >
            <View>
              <Text>Poreska osnovica:</Text>
              <Text>Iznos PDV-a:</Text>
              <Text>Ukupan iznos sa PDV-om:</Text>
              <Text>Za uplatu:</Text>
            </View>
            <View style={{ textAlign: "right", marginRight: "135px" }}>
              <Text>{props.data.ukupnaCijena}</Text>
              <Text>
                {(props.data.ukupnaCijenaPDV - props.data.ukupnaCijena).toFixed(
                  2
                )}
              </Text>
              <Text>{props.data.ukupnaCijenaPDV}</Text>
              <Text style={{ fontWeight: "bold" }}>
                {props.data.ukupnaCijenaPDV}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
