import React from 'react';
import Card from './card/Card';
import './Info.css';
import { EmptyProps, StateArr, UserData } from '../../types/props.types';
import Loader from './loader/Loader';
import Search from './search/Search';
import ErrorTestButton from '../errorBoundary/errorTestButton';

class Info extends React.Component<EmptyProps, StateArr> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      output: [],
      isLoading: false,
      searchText: '',
    } as StateArr;
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = () => {
    this.setState({ isLoading: true });
    const searchItem: string | null =
      localStorage.getItem('searchKey') === '' ||
      !localStorage.getItem('searchKey')
        ? this.state.searchText
        : localStorage.getItem('searchKey');
    fetch(`https://swapi.dev/api/vehicles/?page=1&search=${searchItem}`)
      .then((response) => response.json())
      .then((data: UserData) => {
        console.log(data);
        this.setState({
          isLoading: false,
          output: data.results,
        });
      })
      .catch((e: string | Record<string, unknown>) => {
        console.error('Error fetching data:', e);
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(_prevProps: EmptyProps, prevState: StateArr) {
    if (this.state.searchText !== prevState.searchText) {
      this.fetchData();
    }
  }

  handleSave = (text: string): void => {
    console.log('Saved text in parent:', text);
    this.setState({ searchText: text });
  };

  render() {
    const infoComponents = this.state.isLoading ? (
      <Loader />
    ) : this.state.output.length === 0 ? (
      <h1>Nothing was found</h1>
    ) : (
      this.state.output.map((user) => (
        <Card
          key={Math.floor(Math.random() * 1000)}
          name={user.name}
          manufacturer={user.manufacturer}
          vehicle_class={user.vehicle_class}
        />
      ))
    );
    return (
      <div>
        <Search onSaveText={this.handleSave} />
        <ErrorTestButton>Error</ErrorTestButton>
        <div className="info-container">{infoComponents}</div>
      </div>
    );
  }
}

export default Info;
