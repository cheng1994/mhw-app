import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './index.css'

import Pagination from '../../../Pagination';

const INITIAL_STATE = {
  visible: false,
  pageOfItems: []
}

class SkillsModal extends Component {
  constructor(props){
    super(props);

    this.state = { ...INITIAL_STATE }
  }

  showModal = () => {
    this.setState(() => ({ 'visible': true }));
  }

  handleSelection = (name) => {
    this.props.callbackFromParent(name);
    this.setState(() => ({ visible: false }))
  }

  handleCancel = (e) => {
    this.setState(() => ({ visible: false }))
  }

  onChangePage = (pageOfItems) => {
    this.setState({ pageOfItems })
  }

  render() {
    const {
      skills,
    } = this.props;
    const {
      visible,
      pageOfItems
    } = this.state;

    return (
      <div>
        <div className="skillsModal__button" onClick={this.showModal}>Skills</div>
        <Modal
          show={visible}
          bsSize="large">
          <Modal.Dialog className="skillsModal">
            <Modal.Header>
              <Modal.Title className="skillsModal__title">Skills</Modal.Title>
            </Modal.Header>
            <Modal.Body className="skillsModal__list">
              {
                Object.keys(pageOfItems).map(key =>
                  <div className="skillsModal__item" key={key} onClick={event => this.handleSelection(pageOfItems[key].name)}>{pageOfItems[key].name}</div>
                )
              }
              <Pagination items={skills} onChangePage={this.onChangePage} />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleCancel}>Close</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>
    )
  }
}
export default SkillsModal;
