import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Image, Item, Label, Modal } from 'semantic-ui-react';

class LeaderBoard extends Component {
  
  constructor(props) {
    super(props);
  }

  generateItem(portfolio) {
    return (
      <Item>
        <Item.Image src={portfolio[0].profileImage || 'https://qph.ec.quoracdn.net/main-qimg-fd530df7817da256186f4d6ab44e13cb-c'} />
        <Item.Content>
          <Item.Header>{portfolio[0] ? portfolio[0].trader : "Redacted"}</Item.Header>
          <Item.Meta>
            <span>Net Gain: ${portfolio[0] ? (portfolio[0].net_gain || this.props.totalGain) : this.props.totalGain}</span>
          </Item.Meta>
          <Item.Description>Total Exposure: ${portfolio[0] ? (portfolio[0].total_cost || this.props.totalCost) : this.props.totalCost}</Item.Description>
          <Item.Extra>
            <Label icon='dollar' content='Trader Results' />
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }

  render() {
    if (this.props.portfolio.length === 0) {
      return <div></div>;
    }
    return (
      <Modal trigger={<div><Icon name='trophy' /> Leader Board</div>} >
        <Modal.Header>Leader Board</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Trade League Rankings</Header>
            <Item.Group divided>
              {this.generateItem([{profileImage: 'http://www.hamptoninstitution.org/images/gekko.JPG', trader: 'Gordon G', net_gain: Number(this.props.totalGain) + 17.05, total_cost: Number(this.props.totalCost) + 34122}])}
              {this.generateItem(this.props.portfolio)}
              {this.generateItem([{profileImage: 'https://www.theforexguy.com/wp-content/uploads/2013/04/stressed-stock-trader.jpg', trader: 'John D', net_gain: Number(this.props.totalGain) - 12.83, total_cost: Number(this.props.totalCost) + 8301}])}
              {this.generateItem([{profileImage: 'http://static6.businessinsider.com/image/544a8c7669beddb62746b144/6-hustles-warren-buffett-used-to-make-53000-by-age-16.jpg', trader: 'Warren B', net_gain: Number(this.props.totalGain) - 85.22, total_cost: Number(this.props.totalCost) + 13091}])}
            </Item.Group>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    portfolio: state.portfolio
  };
};

export default connect(mapStateToProps)(LeaderBoard);