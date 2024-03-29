import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'
import ImagenCripto from './img/imagen-criptos.png'


const Contenedor= styled.div`
 max-width: 900px;
 margin: 0 auto;
 width: 90%;
 @media (min-width: 992px){
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
 }
`

const Imagen= styled.img`
 max-width: 400px;
 width: 80%;
 margin: 100px auto 0 auto;
 display: block;
`


const Heading= styled.h1 `
 font-family: 'Lato', sans-serif;
 color: #FFF;
 text-align: center;
 font-weight: 700;
 margin-top: 80px;
 margin-bottom: 50px;
 font-size: 34px;

 &::after{
  content: '';
  width: 100px;
  height: 5px;
  background-color: #7575fd;
  display: block;
  margin: 18px auto 0 auto;
 }
`


function App() {
  
  const [monedas, setMonedas]= useState({})
  const [resultado, setResultado]= useState({})
  const [spinner, setSpinner]= useState(false)

  useEffect(() => {
      if(Object.keys(monedas).length > 0){
        const cotizarCripto= async () => {

          setSpinner(true)
          setResultado({})

          const {moneda, criptoMoneda}= monedas
           const URL= `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`
           const respuesta= await fetch(URL)
           const resultado= await respuesta.json()
           setResultado(resultado.DISPLAY[criptoMoneda][moneda])

           setSpinner(false)
           
        }
        cotizarCripto()
      }
  }, [monedas])

  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt='imagenes criptomonedas' />
      <div>
      <Heading>Cotiza Criptomonedas ahora</Heading>
      <Formulario setMonedas={setMonedas} />

      {spinner && <Spinner />}
      {resultado.PRICE && <Resultado resultado={resultado} />}
      </div>
      
    </Contenedor>
  )
}

export default App
