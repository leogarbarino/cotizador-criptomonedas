import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";

const InputSubmit = styled.input`
  background-color: #6e6efc;
  border: none;
  border-radius: 5px;
  width: 100%;
  padding: 10px;
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #3535f8;
    cursor: pointer;
  }
`;

const Formulario = ({setMonedas}) => {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas);
  const [criptoMoneda, SelectCriptoMoneda] = useSelectMonedas(
    "Elige tu Criptomoneda",
    criptos
  );

  useEffect(() => {
    const consultaAPI = async () => {
      const URL =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";

      const respuesta = await fetch(URL);
      const resultado = await respuesta.json();

      const arrayCriptos = resultado.Data.map((cripto) => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };

        return objeto;
      });
      setCriptos(arrayCriptos);
    };
    consultaAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([moneda, criptoMoneda].includes("")) {
      setError(true);

      return;
    }

    setError(false)
    setMonedas({
      moneda,
      criptoMoneda
    })
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}

      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCriptoMoneda />

        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Formulario;
