import  PropTypes  from 'prop-types'
import { FaPencilAlt, FaTrash } from 'react-icons/fa/index.esm';

export const TableItem = ({movie: {id,title,length,rating, genre ,awards}, handleEditMovie , handleDeleteMovie }) => {
  return (
    <tr>
    <td>{title}</td>
    <td>{length}</td>
    <td>{rating}</td>
    <td>
    {genre?.name }
    </td>
    <td>{awards}</td>
    <td>
      <div className='d-flex '>
        <button className='btn btn-sm btn-outline-success rounded mr-3' onClick={() => handleEditMovie(id)} ><FaPencilAlt /></button>
        <button className='btn btn-sm btn-outline-danger rounded '  onClick={() => handleDeleteMovie(id)}><FaTrash/></button>

      </div>
    </td>
  </tr>
  )
}

TableItem.propTypes = {
   movie : PropTypes.object,
   handleEditMovie : PropTypes.func,
   handleDeleteMovie: PropTypes.func
}
TableItem.defaultProps = {
  genre: 'sin genero asignado'
};
