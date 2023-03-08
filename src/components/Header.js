import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    loading: false,
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ loading: false, name: user.name });
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search"> Pesquisa </Link>
        <Link data-testid="link-to-favorites" to="/favorites"> Favoritos </Link>
        <Link data-testid="link-to-profile" to="/profile"> Perfil </Link>
        {loading && <Loading />}
        <p data-testid="header-user-name">{ name }</p>
      </header>
    );
  }
}

export default Header;
