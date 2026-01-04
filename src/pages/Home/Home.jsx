import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import MoviesListContainer from '@/components/MoviesList/container/MoviesListContainer'

function Home() {
  return (
    <div className="home-page">
      <Header />
      <MoviesListContainer />
      <Footer />
    </div>
  )
}

export default Home
