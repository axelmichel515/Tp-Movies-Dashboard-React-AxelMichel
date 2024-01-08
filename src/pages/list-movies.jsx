import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Row,
    Table,
  } from "react-bootstrap";
  import { TableItem } from "../component/TableItem";
  import { useEffect, useState } from "react";
  import { Loading } from "../component/Loading";
  import { Paginator } from "../component/Paginator";
  import { FormSearch } from "../component/FormSearch";
  import { FormMovie } from "../component/FormMovie";
  import { showMessage } from "../component/Toast";
import Swal from "sweetalert2";
  
  export const ListMovie = () => {
    const [movie, setMovie] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
      pagesCount: 0,
      pages: [],
      currentPage: 1,
    });
  
    const getMovies = async (endpoint = "/api/v1/movies") => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001${endpoint}`);
        const result = await response.json();
        setLoading(false);
        setMovies(result.data);
        setPagination(result.meta);
        return result;
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      getMovies();
    }, []);
  
    const handlePagination = async (endpoint) => {
      getMovies(endpoint);
    };
    const handlePrevPage = () => {
      if (pagination.currentPage > 1) {
        handlePagination(`/api/v1/movies?page=${pagination.currentPage - 1}`);
      }
    };
  
    const handleNextPage = () => {
      if (pagination.currentPage < pagination.pagesCount) {
        handlePagination(`/api/v1/movies?page=${pagination.currentPage + 1}`);
      }
    };
  
    const handleAddMovie = async (data) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/movies`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const result = await response.json();
  
        showMessage(result.message);
        getMovies();
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleEditMovie = async (id) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/movies/${id}`
        );
        const result = await response.json();
  
        result.ok && setMovie(result.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleUpdateMovie = async (id, data) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/movies/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const result = await response.json();
        setMovies(
          movies.map((movie) =>
            movie.id === result.data.id ? result.data : movie
          )
        );
        setMovie(null)
        showMessage(result.message)
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleDeleteMovie = async (id) => {

        Swal.fire({
            title: "¿Está seguro de eliminar esta película?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Si, Eliminala",
            denyButtonText: `No,Cancelar`
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    const response = await fetch(
                      `${import.meta.env.VITE_APP_API_URL}/movies/${id}`,
                      {
                        method: "DELETE",
                      }
                    );
                    const result = await response.json();
                    if (result.ok){
                      showMessage(result.message)
                      setMovie(movies.filter(movie => movie.id !== id))
                    }
              
                  } catch (error) {
                    console.log(error);
                  }
            } 
          });

      
    }
  
    return (
      <Row>
        <Col sm={12} lg={4}>
          <Card className=" shadow-lg bg-dark text-white">
            <CardHeader className=" shadow-lg bg-dark ">
              <CardTitle>{movie ? "Editar" : "Agregar"} Pelicula</CardTitle>
            </CardHeader>
            <CardBody>
              <FormMovie
                handleAddMovie={handleAddMovie}
                handleUpdateMovie={handleUpdateMovie}
                movie={movie}
                setMovie={setMovie}
              />
            </CardBody>
          </Card>
        </Col>
        <Col sm={12} lg={8}>
          <Card className=" shadow-lg bg-dark ">
            <CardBody>
              <CardHeader className="d-flex shadow-lg bg-dark justify-content-between">
                <FormSearch getMovies={getMovies} />
                <Paginator
                  pagination={pagination}
                  handleNextPage={handleNextPage}
                  handlePagination={handlePagination}
                  handlePrevPage={handlePrevPage}
                />
              </CardHeader>
              {loading ? (
                <Loading />
              ) : (
                <Table striped borderless className="text-white" responsive>
                  <thead>
                    <tr>
                      <th>Título </th>
                      <th>Duración</th>
                      <th>Rating</th>
                      <th>Géneros</th>
                      <th>Premios</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movies.map((movie) => (
                      <TableItem
                        key={movie.id}
                        movie={movie}
                        handleEditMovie={handleEditMovie}
                        handleDeleteMovie={handleDeleteMovie}
                      />
                    ))}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };
  