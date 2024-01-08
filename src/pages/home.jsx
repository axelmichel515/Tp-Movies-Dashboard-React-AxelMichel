import { ContentRowMovies } from "../component/ContentRowMovies"
import { GenresInDb } from "../component/GenresInDb"
import { LastMovieInDb } from "../component/LastMovieInDb"



export const Home = () => {
  return (
    <>
    <ContentRowMovies />
    <div className="row">

    <LastMovieInDb />
    <GenresInDb />
  </div>
  </>
  )
}
