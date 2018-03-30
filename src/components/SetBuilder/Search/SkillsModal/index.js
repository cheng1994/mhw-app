import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import './index.css'

const INITIAL_STATE = {
  visible: false,
}

class SkillsModal extends Component {
  constructor(props){
    super(props);

    this.state = { ...INITIAL_STATE }
  }

  showModal = () => {
    this.setState(() => ({ 'visible': true }));
  }

  handleOk = (e) => {
    this.setState(() => ({ visible: false }))
  }

  handleCancel = (e) => {
    this.setState(() => ({ visible: false }))
  }

  render() {
    const {
      skills
    } = this.props;
    const {
      visible
    } = this.state;

    return (
      <div>
         <Button type="primary" onClick={this.showModal}>Open</Button>
         <Modal
           wrapClassName="skillsModal"
           visible={visible}
           title="Skills"
           onOk={this.handleOk}
           onCancel={this.handleCancel}
          >
            <div className="skillsModal__list">
              {
                Object.keys(skills).map(key => {
                  return <div key={key}>{skills[key].name}</div>
                })
              }
            </div>
          </Modal>
      </div>
    )
  }
}
export default SkillsModal;
