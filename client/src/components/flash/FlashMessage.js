import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames';
class FlashMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHide: false
    }
  }

  componentDidMount() {
    this.hideFlashMessage();
  }

  static propsTypes = {
    message: PropTypes.object.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired
  }

  hideFlashMessage = () => {
    setTimeout(() => {
      this.setState({
        isHide: true
      })
    }, 5000);
  }
  onClick = () => {
    this.props.deleteFlashMessage(this.props.message.id)
  }
  render() {
    const { type, text } = this.props.message
    console.log(this.props);
    return (
      <div
        className= {
          classnames( 'alert', {
            'alert-success': type ==='success',
            'alert-danger': type === 'danger'
        })}
        style={{ display: this.state.isHide ? 'none' : 'block'}}
      >
        <button onClick={ this.onClick } className="close"><span>&times;</span></button>
        { text }
      </div>
    )
  }
}

export default FlashMessage;