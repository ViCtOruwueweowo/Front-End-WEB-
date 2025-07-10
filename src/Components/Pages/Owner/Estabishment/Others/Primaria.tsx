import styles from './Estilo.module.css'

function Primaria() {
  return (
    <div>

      <div className="d-flex d-flex justify-content-center">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col" className={`${styles.textTable}`} style={{ color: "#256ea1" }}> <b>Nombre</b> </th>
              <th scope="col" className={`${styles.textTable}`} style={{ color: "#256ea1" }}> <b>Direccion</b> </th>
              <th scope="col" className={`${styles.textTable}`} style={{ color: "#256ea1" }}> <b>Telefono</b> </th>
              <th scope="col" className={`${styles.textTable}`} style={{ color: "#256ea1" }}> <b>Ciudad</b> </th>
              <th scope="col" className={`${styles.textTable}`} style={{ color: "#256ea1" }}> <b>Opciones</b> </th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td className={`${styles.textTable2}`}>Primaria Colores</td>
              <td className={`${styles.textTable2}`}>Calle tres </td>
              <td className={`${styles.textTable2}`}>871 720 4660</td>
              <td className={`${styles.textTable2}`}>Torreon Coah</td>
              <td >
                <button style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}><img src="/8.png" alt="Ícono personalizado" style={{ width: "25px", height: "25px", marginRight:"10px" }} /></button>
                <button style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}><img src="/6.png" alt="Ícono personalizado" style={{ width: "25px", height: "25px",marginRight:"10px" }} /></button>
                <button style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}><img src="/5.png" alt="Ícono personalizado" style={{ width: "25px", height: "25px" }} /></button>
              </td>


            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Primaria;