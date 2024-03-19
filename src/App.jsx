import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AccountsTable from './components/AccountsTable';

function App() {

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch('/mocks/accounts.mock.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Red no disponible');
        }
        return response.json();
      })
      .then(data => setDatos(data.data))
      .catch(error => console.error('Error al recibir los datos:', error));
  }, []);

  const handleDelete = (item) => {
    setDatos(
      datos.filter(dato =>
      dato.id !== item.id
      )
    );
  }

  const handleEdit = (nextAlias) => {
    setDatos(nextAlias);
  }

  return (
    <>
      <h1 style={{marginBottom:'40px'}}>Mis Cuentas</h1> 
      {datos && <AccountsTable tableData={datos} onEdit={handleEdit} OnDelete={handleDelete} />}
    </>
  )
}

export default App
