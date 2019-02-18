import React, { Component } from 'react'
import Header from '../../components/header/header';
import bear from '../../assets/images/bear-face.svg'
import './style.css';
import addIcon from '../../assets/images/add.svg';
import DateFilter from '../../components/dateFilter';
import api from '../../services/http/api';
import ListItem from '../../components/JogsList/listItem';

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
   componentDidMount = async () => {
    api.get('data/sync/',{}, {}).then((response)=>{
      console.log(response.response.jogs);
       this.setState({jogs: response.response.jogs,  });
       this.forceUpdate();
    })
  }
  onItemClicked = (item) => {
    this.props.changeScreen('edit', {item})
  }
  
  changeMin =(min) => {this.setState({minFilter: min})}
  changeMax =(max) => {this.setState({maxFilter: max})}

  showJogs = () =>{
    let {jogs, minFilter, maxFilter}  = this.state;
    if(this.state.filterEnabled){
      jogs = jogs.filer(item=>{
        return item.date >= minFilter && item.date <= maxFilter;
      })
    }
    return (jogs.map(item => {
      return (<ListItem key={item.id} onClick={() =>this.onItemClicked(item)} {...item}/>)
    }))
  }

  render() {
    const {filterEnabled} = this.state;
    console.log(this.state.jogs);

    return (
      <div>
        <Header showButtons onFilterClicked={()=>{this.setState({ filterEnabled:!this.state.filterEnabled })}}>
        </Header>
        {filterEnabled ? (<DateFilter changeMin={this.changeMin} changeMax={this.changeMax} />): ''}
        <body className='body'>
        {
          this.state.jogs ? (<li>
            {this.state.jogs.map(item => {
              return (<ListItem key={item.id} onClick={() =>this.onItemClicked(item)} {...item}/>)
            })}
          </li>):''
        }
         <img src={addIcon} className="fab" alt="logo" onClick={()=>{ this.props.changeScreen("edit");}} />
        </body>
        <footer/>
      </div>
    )
  }
}
