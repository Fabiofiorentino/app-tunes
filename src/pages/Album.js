import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    musicas: [],
    loading: false,
    artista: '',
    collection: '',
  };

  async componentDidMount() {
    this.musicSearch();
  }

  async musicSearch() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const musicas = await getMusics(id);
    this.setState({
      musicas: musicas.filter((musica) => musica.trackId !== undefined),
      loading: false,
      artista: musicas[0].artistName,
      collection: musicas[0].collectionName,
    });
  }

  render() {
    const { musicas, loading, artista, collection } = this.state;
    return (
      <div>
        {loading ? <Loading />
          : (
            <div data-testid="page-album">
              <Header />
              <h3 data-testid="artist-name">{artista}</h3>
              <h4 data-testid="album-name">{collection}</h4>
              {musicas.map((musica, index) => (
                <MusicCard
                  key={ index }
                  trackName={ musica.trackName }
                  previewUrl={ musica.previewUrl }
                  trackId={ musica.trackId }
                  musica={ musica }
                />))}
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
