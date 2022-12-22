import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Button from './components/Button'
import { formatearDinero, calcularTotalPagar } from './helpers'

function App() {

  const [cantidad, SetCantidad] = useState(10000);
  const [meses, SetMeses] = useState(6);
  const [total, SetTotal] = useState(0);
  const [pago, SetPago] = useState(0);

  useEffect(() => {
    const resultadoTotalPagar = calcularTotalPagar(cantidad, meses);

    SetTotal(resultadoTotalPagar);

    //calcular el pago mensual
    SetPago(total / meses);

  }, [cantidad, meses, total])

  const min = 0
  const max = 20000
  const step = 100

  function handleChange(e) {
    SetCantidad(Number(e.target.value));
  }

  function handleDescremento() {

    const valor = cantidad - step

    if (valor < min) {
      alert('Cantidad no valida');

      return;
    }
    SetCantidad(valor)
  }

  function handleIncremento() {

    const valor = cantidad + step

    if (valor > max) {

      alert('Cantidad no valida');

      return;
    }
    SetCantidad(valor)
  }


  return (
    <div className='my-20 max-w-lg  mx-auto bg-white shadow p-10'>
      <Header />

      <div className='flex justify-between my-14'>

        <Button
          operador={"-"}

          fn={handleDescremento}
        />

        <input
          type="range"
          className='w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600'
          onChange={handleChange}
          max={max}
          step={step}
          min={min}
          value={cantidad}

        />

        <Button
          operador={"+"}

          fn={handleIncremento}
        />

      </div>

      <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>

        {formatearDinero(cantidad)}

      </p>

      <h2 className="text-2xl font-extrabold text-gray-500 text-center" >
        Elige un <span className='text-indigo-600'>Plazo </span> a pagar
      </h2>

      <select className='mt-5 w-full  bg-white border border-gray-500 rounded-lg
       text-center text-xl font-bold  text-gray-500'
        onChange={e => SetMeses(e.target.value)}
        value={meses}
      >

        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>

      </select>

      <div className="my-5 space-y-3 bg-gray-50 p-5">

        <h2 className="text-2xl font-extrabold text-gray-500 text-center" >
          Resumen <span className='text-indigo-600'>De Pagos </span>
        </h2>

        <p className="text-xl text-gray-500 text-center font-bold">{meses} Meses</p>
        <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(total)} Total a Pagar</p>
        <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(pago)}Mensuales</p>

      </div>

    </div>


  )
}

export default App
