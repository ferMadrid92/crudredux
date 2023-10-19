import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
// Acciones de redux
import { crearNuevoProductoAction } from "../actions/productoActions"
import { mostrarAlertaAction, ocultarAlertaAction } from "../actions/alertaActions"

const NuevoProducto = ({history}) => {

  const navigate = useNavigate()

  //state del componente
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState(0)

  //utilizar use dispatch y te crea una funcion
  const dispatch = useDispatch()

  // Acceder al state del store
  const cargando = useSelector( state => state.productos.loading )
  const error = useSelector(state => state.productos.error)
  const alerta = useSelector(state => state.alerta.alerta )
  
  // mandar a llamar el action del productoAction
  const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto))
  // cuando el usuario haga submit
  const submitNuevoProducto = e => {
    e.preventDefault()

    // validar formulario
    if(nombre.trim() === '' || precio <= 0) {

      const alerta = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3'
      }
      dispatch(mostrarAlertaAction(alerta))

      return console.log('todos los campos son obligatorios')
    }
    // si no hay errores
    dispatch( ocultarAlertaAction() )

    // crear el nuevo producto
    agregarProducto({
      nombre,
      precio
    })

    // redireccionar
    setTimeout(() => {
      navigate('/')
    }, 1600)    
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>

            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

            <form
              onSubmit={submitNuevoProducto}
            >
              <div className="form-group">
                <label htmlFor="nombre-producto">Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  id="nombre-producto"
                  name="nombre"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="precio-producto">Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  id="precio-producto"
                  name="precio"
                  value={precio}
                  onChange={e => setPrecio(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>

            { cargando ? <p>Cargando...</p> : null }
            { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
          </div>
        </div>
      </div>
    </div>
  )
}

export default NuevoProducto
