import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
    state = {
      loading: false,
      isChecked: false,
    }

    async componentDidMount() {
      const favoriteSongs = await getFavoriteSongs();
      const { trackId } = this.props;
      const checked = favoriteSongs.some((song) => song.trackId === trackId);
      this.setState({
        isChecked: checked,
      });
    }

    checkboxChange = () => {
      const { isChecked } = this.state;
      if (isChecked) {
        this.setState({
          isChecked: false,
        }, () => this.removeFavoriteSong());
      } else {
        this.setState({
          isChecked: true,
        }, () => this.addFavoriteSong());
      }
    }

    async removeFavoriteSong() {
      this.setState({ loading: true });
      const { musica } = this.props;
      await removeSong(musica);
      this.setState({ loading: false, isChecked: false });
    }

    async addFavoriteSong() {
      this.setState({ loading: true });
      const { musica } = this.props;
      await addSong(musica);
      this.setState({ loading: false, isChecked: true });
    }

    render() {
      const { loading, isChecked } = this.state;
      const { trackName, previewUrl, trackId, musica, index } = this.props;
      return (
        <div>
          {loading ? <Loading />
            : (
              <div>
                <p>{ trackName }</p>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                </audio>
                <label htmlFor={ trackId }>
                  Favorita
                  <input
                    id={ trackId }
                    name="isFavorite"
                    type="checkbox"
                    data-testid={ `checkbox-music-${trackId}` }
                    onChange={ this.checkboxChange }
                    checked={ isChecked }
                    index={ index }
                    musica={ musica }
                  />
                </label>
              </div>
            )}
        </div>
      );
    }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musica: PropTypes.shape({}).isRequired,
  index: PropTypes.number.isRequired,
};

export default MusicCard;
