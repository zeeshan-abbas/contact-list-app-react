import React, {Component} from 'react';
import {Modal, FormGroup, Button, ControlLabel, FormControl} from 'react-bootstrap';
import './contact-modal.css';

export default class ContactModal extends Component {

    constructor(props) {
        super();
        this.state = {
            index: -1,
            title: 'Create New Contact',
            fullName: '',
            category: '',
            phoneNumber: '',
            age: '',
            fullNameError: '',
            phoneNumberError: '',
            ageError: ''
        };
    }

    componentWillReceiveProps(props) {
        if (props.contact && Object.keys(props.contact).length > 0) {
            let contact = Object.assign(props.contact, {title: "Edit Contact"});
            this.setState(contact);
        } else {
            this.setState({title: "Create New Contact"});
        }
    }

    handleSave() {
        var error = false;
        if (this.state.fullName.length <= 0) {
            error = true;
            this.setState({fullNameError: 'Full Name is Required'});
        }

        if (this.state.phoneNumber.length <= 0) {
            error = true;
            this.setState({phoneNumberError: 'Phone Number is Required'});
        }

        if (this.state.age.length <= 0) {
            error = true;
            this.setState({ageError: 'Age is Required'});
        }

        if (!error) {
            const contact = {
                index: this.state.index,
                fullName: this.state.fullName,
                category: this.state.category,
                phoneNumber: this.state.phoneNumber,
                age: this.state.age
            };
            this.setState({
                index: -1,
                fullName: '',
                category: '',
                phoneNumber: '',
                age: '',
                fullNameError: '',
                phoneNumberError: '',
                ageError: ''
            });

            this.props.onSave(contact);
        }
    }

    handleClose() {
        this.setState({
            index: -1,
            fullName: '',
            category: '',
            phoneNumber: '',
            age: '',
            fullNameError: '',
            phoneNumberError: '',
            ageError: ''
        });
        this.props.onCancel();
    }

    handleNameChange(e) {
        this.setState({ fullName: e.target.value, fullNameError: '' });
    }

    handleCategoryChange(e) {
        this.setState({ category: e.target.value });
    }

    handlePhoneNumberChange(e) {
        this.setState({ phoneNumber: e.target.value, phoneNumberError: ''});
    }

    handleAgeChange(e) {
        this.setState({ age: e.target.value, ageError: ''});
    }


    render() {
        return (
            <Modal show={this.props.show} >
                <Modal.Header>
                    <Modal.Title>{this.state.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup
                            controlId="contactForm">
                            <ControlLabel>Full Name</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.fullName}
                                placeholder="Enter Name"
                                onChange={this.handleNameChange.bind(this)}
                            />
                            <div className="error">{this.state.fullNameError}</div>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Category</ControlLabel>
                            <FormControl
                                componentClass="select"
                                placeholder="Select Category"
                                value={this.state.category}
                                onChange={this.handleCategoryChange.bind(this)} >
                                <option value="Friends">Friends</option>
                                <option value="Family">Family</option>
                                <option value="Relatives">Relatives</option>
                                <option value="Colleagues">Colleagues</option>
                                <option value="Other">Other</option>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Phone Number</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.phoneNumber}
                                placeholder="Enter Phone Number"
                                onChange={this.handlePhoneNumberChange.bind(this)}
                            />
                            <div className="error">{this.state.phoneNumberError}</div>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Age</ControlLabel>
                            <FormControl
                                type="number"
                                value={this.state.age}
                                placeholder="Enter Age"
                                onChange={this.handleAgeChange.bind(this)}
                            />
                            <div className="error">{this.state.ageError}</div>
                        </FormGroup>
                    </form>
                    <div className="error">
                        {this.state.error}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleSave.bind(this)}>Save</Button>
                    <Button onClick={this.handleClose.bind(this)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }

}