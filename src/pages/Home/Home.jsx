import Header from '@/components/ui/Header/Header'
import Footer from '@/components/ui/Footer/Footer'
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
