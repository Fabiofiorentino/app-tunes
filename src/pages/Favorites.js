import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    loading: false,
    favorites: [],
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ loading: false, favorites: favoriteSongs });
  }

  isFavorite = () => {
    const { favorites } = this.state;
    if (favorites.length) {
      return favorites.map((musica) => (
        <MusicCard
          key={ musica.trackName }
          trackName={ musica.trackName }
          previewUrl={ musica.previewUrl }
          trackId={ musica.trackId }
          music={ musica }
        />
      ));
    }
    return (<p>Não há músicas favoritas</p>);
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading />
          : this.isFavorite() }

      </div>
    );
  }
}

export default Favorites;
