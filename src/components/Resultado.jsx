import styled from "@emotion/styled";

const ContenedorResultado = styled.div`
  color: #fff;
  font-family: "Lato", sans-serif;
  margin-top: 35px;
  display: flex;
  align-items: start;
`;

const Imagen= styled.img`
  display: block;
  width: 120px;
  gap: 1rem;
  margin-top: 50px;
  margin-right: 20px;

`

const Texto = styled.p`
  font-size: 18px;
  span {
    font-weight: 400;
  }
`;

const Precio = styled.p`
  font-size: 22px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  span {
    font-weight: 400;
  }
`;

const Resultado = ({ resultado }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    resultado;

  return (
    <ContenedorResultado>
      <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="imagen cripto" />
      <div>
        <Precio>
          Precio al momento: <span>{PRICE}</span>
        </Precio>
        <Texto>
          Precio mayor del día: <span>{HIGHDAY}</span>
        </Texto>
        <Texto>
          Precio menor del día: <span>{LOWDAY}</span>
        </Texto>
        <Texto>
          Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span>
        </Texto>
        <Texto>
          Última actualización: <span>{LASTUPDATE}</span>
        </Texto>
      </div>
    </ContenedorResultado>
  );
};

export default Resultado;
