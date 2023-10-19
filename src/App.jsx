import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Productos from "./components/Productos"
import NuevoProducto from "./components/NuevoProducto"
import EditarProducto from "./components/EditarProducto"

//Redux
import { Provider } from 'react-redux'
//Redux persist
import { PersistGate } from 'redux-persist/integration/react'
import store,{ persistor } from "./store"

function App() {

  return (
    <Router>
      <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <Header />
          <div className="container mt-5">
            <Routes>
              <Route exact path="/" element={<Productos />} />
              <Route exact path="/productos/nuevo" element={<NuevoProducto />} />
              <Route exact path="/productos/editar/:id" element={<EditarProducto />} />
            </Routes>
          </div>
          </PersistGate>
      </Provider>
    </Router>
  )
}

export default App
