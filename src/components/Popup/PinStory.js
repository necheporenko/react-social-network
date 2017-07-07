import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import './index.scss';

export default class PinStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      order: 0,
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    this.Counter = this.Counter.bind(this);
    // this.deleteStory = this.deleteStory.bind(this);
  }

  Close() {
    this.setState({ showModal: false });
  }
  Open() {
    this.setState({ showModal: true });
  }

  Counter(type) {
    const currentPinOrder = this.pinOrder;
    console.log(currentPinOrder);

    switch (type) {
      case 'inc':
        this.setState({
          order: this.state.order + 1
        });
        break;

      case 'dec':
        this.setState({
          order: this.state.order - 1
        });
        break;

      default:
        console.log('error');
    }
  }

  // deleteStory() {
  //   this.props.deleteStory(this.props.id);
  // }

  render() {
    const { books } = this.props;
    return (
      <div className="delete-story-popup" onClick={this.Open}>
        <Modal show={this.state.showModal} onHide={this.Close}>
          <Modal.Header closeButton>
            <Modal.Title>Pin Story</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {/*<p>fldklfkdkfkdkfkdkfodofkd</p>*/}
            { books.map((book) => (
              <div key={book.id} className="pin-body">
                <div style={{paddingBottom: '13px'}}>{book.name}</div>
                <div className="pin-counter">
                  <input type="text" value={this.state.order} id={book.id} ref={(c) => { this.pinOrder = c; }}/>
                  <div className="plus" onClick={() => this.Counter('inc')}>+</div>
                  <div className="minus" onClick={() => this.Counter('dec')}>-</div>
                </div>
              </div>
            ))}
          </Modal.Body>

          <Modal.Footer>
            <div style={{float: 'right'}}>
              <button className="btn-brand btn-cancel" onClick={this.Close}>Cancel</button>
              <button
                className="btn-brand" style={{marginLeft: '10px'}} type="submit"
                // onClick={() => this.deleteStory()}
              >Pin Story</button>
            </div>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}

PinStory.propTypes = {
  deleteStory: PropTypes.func,
  id: PropTypes.number,
};
