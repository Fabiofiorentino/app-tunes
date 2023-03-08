import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loading: false,
  }

  componentDidMount() {
    this.getUserInfo();
  }

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

  render() {
    const { loading, name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading />
          : (
            <div>
              <img data-testid="profile-image" src={ image } alt={ name } />
              <h3>Nome</h3>
              <p>{ name }</p>
              <h3>E-mail</h3>
              <p>{ email }</p>
              <h3>Descrição</h3>
              <p>{ description }</p>
              <Link to="/profile/edit">
                Editar perfil
              </Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
