import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
import { Container } from './styles';
import logoAppTunes from '../../assets/Logotipo-App-Tunes.png';

class Login extends React.Component {
  state = {
    name: '',
    isButtonDisabled: true,
    loading: false,
  }

  componentWillUnmount() {
    this.setState({ loading: false });
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => this.checkInput());
  };

  checkInput = () => {
    const { name } = this.state;
    const limitCharacter = 3;
    if (name.length >= limitCharacter) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  loginSubmit = () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name });
      history.push('/search');
    });
  }

  render() {
    const { name, isButtonDisabled, loading } = this.state;
    return (
      <Container>
        <div className="page-login">
          <img src={logoAppTunes} alt='App Tunes' style={{width: "300px"}}/>
          <div className='input-div'>
          {loading ? <Loading /> : 
          
            <><input
                name="name"
                type="text"
                onChange={this.handleChange}
                value={name}
                placeholder='Digite seu nome' /><button
                  type="button"
                  disabled={isButtonDisabled}
                  onClick={this.loginSubmit}
                >
                  Entrar
                </button></>
          
          }
          </div>
        </div>
      </Container>
      
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
