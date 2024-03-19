import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Table, Button } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons'; 

export default function AccountsTable({tableData, onEdit, OnDelete}) {

    const handleOnEdit = (item) => {
        withReactContent(Swal).fire({
            title: <i>Nuevo alias</i>,
            input: 'text',

            preConfirm: () => {
            const nextAlias = tableData.map(dato => {
                if(dato.id === item.id) {
                return {
                    ...dato,
                    alias: Swal.getInput()?.value || dato.alias
                }
                } else {
                return dato;
                }
            })
            onEdit(nextAlias)
            },
        })
    }

    const handleOnDelete = (item) => {
        Swal.fire({
            title: "¿Estas seguro que quieres eliminar esta cuenta?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            denyButtonText: `No eliminar`
        }).then((result) => {
            if (result.isConfirmed) {
              OnDelete(item)
            Swal.fire("Cuenta eliminada", "", "success");
            } else if (result.isDenied) {
            Swal.fire("No se eliminó la cuenta", "", "info");
            }
        });
    }

  return (
     
    <Table striped bordered hover responsive>
     <thead>
       <tr>
         <th>Número de cuenta</th>
         <th>Saldo</th>
         <th>Alias</th>
         <th>Editar</th>
         <th>Borrar</th>
       </tr>
     </thead>
     <tbody>
       {tableData.map(item => {
         return (
           <tr key={item.id}>
             <td>{item.accountNumber}</td>
             <td>{new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(item.saldo)}</td>
             <td>{item.alias}</td>
             <td><Button variant="secondary" onClick={() => handleOnEdit(item)}><Pencil /></Button></td>
             <td><Button variant="danger" onClick={() => handleOnDelete(item)}><Trash /></Button></td>
           </tr>
           )
       })}
     </tbody>
   </Table>
  )
}
