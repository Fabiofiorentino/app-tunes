import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loading: false,
    isButtonDisabled: true,
  }

  componentDidMount() {
    this.getUserInfo();
    this.checkInput();
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => this.checkInput());
  };

  async getUserInfo() {
    this.setState({ loading: true });
    const userInfo = await getUser();
    this.setState({
      name: userInfo.name,
      email: userInfo.email,
      image: userInfo.image,
      description: userInfo.description,
      loading: false,
    });
  }

  checkInput = () => {
    const { name, email, description, image } = this.state;
    const limitCharacter = 1;
    if (
      name.length >= limitCharacter
      && email.length >= limitCharacter
      && description.length >= limitCharacter
      && image.length >= limitCharacter
    ) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  editSubmit = () => {
    const { history } = this.props;
    const { name, description, image, email } = this.state;
    const newInfos = {
      name,
      description,
      image,
      email,
    };
    this.setState({
      loading: true,
    }, async () => {
      await updateUser({ ...newInfos });
      history.push('/profile');
    });
  }

  render() {
    const { loading, name, email, image, description, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading />
          : (
            <div>
              <form>
                <h3>Nome</h3>
                <input
                  name="name"
                  type="text"
                  onChange={ this.handleChange }
                  value={ name }
                  data-testid="edit-input-name"
                />
                <h3>E-mail</h3>
                <input
                  name="email"
                  type="email"
                  onChange={ this.handleChange }
                  value={ email }
                  data-testid="edit-input-email"
                />
                <h3>Descrição</h3>
                <input
                  name="description"
                  type="textarea"
                  onChange={ this.handleChange }
                  value={ description }
                  data-testid="edit-input-description"
                />
                <h3>Foto de Perfil</h3>
                <input
                  name="image"
                  type="text"
                  onChange={ this.handleChange }
                  value={ image }
                  data-testid="edit-input-image"
                />
                <br />
                <button
                  data-testid="edit-button-save"
                  type="button"
                  disabled={ isButtonDisabled }
                  onClick={ this.editSubmit }
                >
                  salvar
                </button>
              </form>
              <Link to="/profile/edit">
                Editar perfil
              </Link>
            </div>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
