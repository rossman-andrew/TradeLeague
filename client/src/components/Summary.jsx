import React, { Component } from 'react';
import { Button, Menu, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import Profile from '../containers/Profile.jsx';
import LeaderBoard from '../containers/LeaderBoard.jsx';

class Summary extends Component {

  constructor(props) {
    super(props);

    this.logInClick = this.logInClick.bind(this);
  }

  findTotalGain() {
    let totalGain = 0;
    for (let i = 0; i < this.props.portfolio.length; i++) {
      totalGain += this.props.portfolio[i].net_gain;
    }
    return totalGain.toFixed(2);
  }

  findTotalCost() {
    let totalCost = 0;
    for (let i = 0; i < this.props.portfolio.length; i++) {
      totalCost += this.props.portfolio[i].total_cost;
    }
    return totalCost.toFixed(2);
  }

  logInClick() {
    location.href = '/login/google';
  }


  render() {
    return (
      <Menu size='small' className='ui top fixed'>
        <Menu.Item name='Trade League' />
        <Menu.Item>
          <LeaderBoard totalCost={this.findTotalCost()} totalGain={this.findTotalGain()} />
        </Menu.Item>
        <Menu.Item>
          <Profile totalCost={this.findTotalCost()} totalGain={this.findTotalGain()} />
        </Menu.Item>
        <Menu.Item >{`Total Gain ${this.findTotalGain()}`}</Menu.Item>
        <Menu.Item >{`Total Exposure ${this.findTotalCost()}`}</Menu.Item>
        {this.props.portfolio.map(stock => {
          if (stock.number_of_shares === 0) {
            return;
          }
          return <Menu.Item key={stock.symbol}>{`${stock.symbol} ${stock.number_of_shares}`}</Menu.Item>;
        })

        }

        <Menu.Menu position='right'>
          <Menu.Item>
            <Input className='icon' icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item>
            <Button onClick={this.logInClick}>Log In</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    portfolio: state.portfolio
  };
};

export default connect(mapStateToProps)(Summary);
