import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames';
import {createEvent} from '../../actions/eventActions';

class EventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      errors: {},
      isLoading: false
    }
  }

  static propTypes = {
    createEvent: PropTypes.func.isRequired
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.createEvent(this.state);
  }
  render() {

    const {isLoading, errors, title} = this.state
    return (
      <form onSubmit= {this.onSubmit}>
        <h1>New Event</h1>
        <div className="form-group">
					<label className="control-label" htmlFor="">Title</label>
					<input
						type="text"
						name = "title"
            value={title}
						onChange={this.onChange}
						className={ classnames('form-control', { 'is-invalid': errors.title }) }
					/>
				</div>
        <div className="form-group">
          <button disabled={ isLoading } className="btn btn-primary btn-lg">Create</button>
				</div>
      </form>
    );
  }
}

export default connect(null, {createEvent})(EventForm)
