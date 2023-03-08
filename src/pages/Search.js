import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    name: '',
    isButtonDisabled: true,
    loading: false,
    albums: [],
    searchInput: '',
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => this.checkInput());
  };

  checkInput = () => {
    const { name } = this.state;
    const limitCharacter = 2;
    if (name.length >= limitCharacter) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  searchButton = () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      const respostaApi = await searchAlbumsAPI(name);
      if (respostaApi.length === 0) {
        this.setState({ loading: false, name: '' });
      }
      this.setState({
        albums: respostaApi,
        loading: false,
        searchInput: name,
        name: '',
      });
    });
  }

  render() {
    const {
      name,
      isButtonDisabled,
      loading,
      albums,
      searchInput,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <p>Digite o nome do Artista ou do Album</p>
        <input
          name="name"
          value={ name }
          type="text"
          onChange={ this.handleChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ isButtonDisabled }
          onClick={ this.searchButton }
        >
          Pesquisar
        </button>
        {loading && <Loading />}
        {albums.length <= 0 ? (<p>Nenhum álbum foi encontrado</p>)
          : (
            <div>
              <p>{`Resultado de álbuns de: ${searchInput}`}</p>
              {albums.map((album) => (
                <div key={ album.collectionId }>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                    <h3>{album.collectionName}</h3>
                    <p>{album.artistName}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}
      </div>
    );
  }
}

export default Search;
