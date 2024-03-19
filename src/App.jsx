import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Table, Button } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';

import mock from './mocks/accounts.mock.json';

function App() {

  const { data } = mock;

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    setDatos(data);
  }, []);

  const onEdit = (item) => {
    withReactContent(Swal).fire({
      title: <i>Nuevo alias</i>,
      input: 'text',

      preConfirm: () => {
        const nextAlias = datos.map(dato => {
          if(dato.id === item.id) {
            return {
              ...dato,
              alias: Swal.getInput()?.value || ''
            }
          } else {
            return dato;
          }
        })
        setDatos(nextAlias);
      },
    })
  }

  const onDelete = (item) => {

    Swal.fire({
      title: "¿Estas seguro que quieres eliminar esta cuenta?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `No eliminar`
    }).then((result) => {
      if (result.isConfirmed) {
        setDatos(
          datos.filter(dato =>
            dato.id !== item.id
          )
        );
        Swal.fire("Cuenta eliminada", "", "success");
      } else if (result.isDenied) {
        Swal.fire("No se eliminó la cuenta", "", "info");
      }
    });

  }

  return (
    <>
     <h1>Accounts</h1>  
     <Table striped bordered hover>
      <thead>
        <tr>
          <th>Numero de cuenta</th>
          <th>Saldo</th>
          <th>Alias</th>
          <th>Editar</th>
          <th>Borrar</th>
        </tr>
      </thead>
      <tbody>
        {datos.map(item => {
          return (
            <tr key={item.id}>
              <td>{item.accountNumber}</td>
              <td>{new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(item.saldo)}</td>
              <td>{item.alias}</td>
              <td><Button variant="secondary" onClick={() => onEdit(item)}><Pencil /></Button></td>
              <td><Button variant="danger" onClick={() => onDelete(item)}><Trash /></Button></td>
            </tr>
            )
        })}
      </tbody>
    </Table>
    </>
  )
}

export default App
