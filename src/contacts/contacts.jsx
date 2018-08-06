import React, {Component} from 'react';
import CustomNavBar from '../nav-bar/nav-bar';
import Contact from './contact/contact'
import {Table, Grid, Pagination, Row, Col, FormControl} from 'react-bootstrap';
import ContactModal from "./contact-modal/contact-modal";
import './contacts.css'

const DUMMY_CONTACTS = [{
    fullName: 'Zeeshan Abbas',
    category: 'Family',
    phoneNumber: '+92 321 4664767',
    age: '29'
}, {
    fullName: 'Haseeb Ahmed',
    category: 'Friends',
    phoneNumber: '+92 321 9922221',
    age: '24'
},{
    fullName: 'John Doe',
    category: 'Colleague',
    phoneNumber: '+92 322 1232221',
    age: '21'
},{
    fullName: 'Richard Hamond',
    category: 'Other',
    phoneNumber: '+92 321 2542342',
    age: '19'
},{
    fullName: 'Jeremy Clarkson',
    category: 'Colleague',
    phoneNumber: '+92 345 3453433',
    age: '26'
},{
    fullName: 'James May',
    category: 'Family',
    phoneNumber: '+92 322 4322233',
    age: '22'
},{
    fullName: 'Dexter Morgan',
    category: 'Friends',
    phoneNumber: '+92 341 5234222',
    age: '32'
},{
    fullName: 'Morgan Freeman',
    category: 'Other',
    phoneNumber: '+92 345 3422222',
    age: '17'
},{
    fullName: 'Angeles Hernadez',
    category: 'Friends',
    phoneNumber: '+92 341 1234555',
    age: '10'
}];



export default class Contacts extends Component {

    constructor(props) {
        super();
        this.createNewContact = this.createNewContact.bind(this);
        this.updateContact = this.updateContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);

        this.state = {
            contacts: DUMMY_CONTACTS,
            selectedContacts: [],
            editContact: {},
            isShowContactModal: false,
            itemsPerPage: 5,
            currentPage: 1,
            sortBy: '', // by default not sorted
            sortOrder: 1 // 1 for asc and -1 for desc
        };
    }

    createNewContact() {
        this.setState({isShowContactModal: true});
    }

    updateContact(index) {
        var contact = Object.assign(this.state.contacts[index], {index: index});
        this.setState({editContact: contact, isShowContactModal: true});
    }

    onContactSelectionChanged(index) {
        let selectedContacts = this.state.selectedContacts;
        if (selectedContacts.indexOf(index) >= 0) {
            selectedContacts.splice(index, 1);
        } else {
            selectedContacts.push(index);
        }
        this.setState({selectedContacts: selectedContacts})
    }

    onPageChange(index) {
        this.setState({currentPage: index});
    }

    onItemsPerPageChange(e) {
        var itemsPerPage = parseInt(e.target.value, 10);
        this.setState({itemsPerPage: itemsPerPage, currentPage: 1});
    }

    deleteContact() {
        if (this.state.selectedContacts.length > 0) {
            const contacts = this.state.contacts.filter((c, i )=> {
                    if (this.state.selectedContacts.indexOf(i) >= 0) {
                        return false;
                    }
                    return true;
                }
            );
            this.setState({contacts: contacts, selectedContacts: []});
        } else {
            alert('Please select contacts to delete')
        }
    }

    onContactModalCancel() {
        this.setState({editContact: {}, isShowContactModal: false});
    }

    onContactModalSave(contact) {
        this.onContactModalCancel();
        var contacts = this.state.contacts;
        if (contact.index >= 0) {
            contacts[contact.index] = contact;
        } else {
            contacts.push(contact);
        }
        this.setState({contacts: contacts});
    }

    onSortChange(sortBy) {
        var sortOrder = this.state.sortOrder;
        if (sortBy === this.state.sortBy) {
            sortOrder = (sortOrder === 1 ? -1 : 1);
        } else {
            sortOrder = 1;
        }

        const contacts = this.state.contacts.sort((a, b) => {
            const result = (a[sortBy] < b[sortBy]) ? -1 : (a[sortBy] > b[sortBy]) ? 1 : 0;
            return result * sortOrder;
        });
        this.setState({contacts: contacts, sortBy: sortBy, sortOrder: sortOrder});
    }

    renderContactList(){
        let contacts = [];
        let startingIndex = this.state.itemsPerPage * (this.state.currentPage - 1);
        let lastIndex = this.state.itemsPerPage * (this.state.currentPage);
        for (let i = startingIndex; i < this.state.contacts.length && i < lastIndex; i++) {
            contacts.push (
                <Contact
                    key={i}
                    contact={this.state.contacts[i]}
                    index={i}
                    selectedContacts={this.state.selectedContacts}
                    onCheckChange={this.onContactSelectionChanged.bind(this, i)}
                    onEditContact={this.updateContact.bind(this, i)}
                />
            )
        }
        const emptyContactView = (<tr key={1}><td colSpan="6">No Contact Found</td></tr>);

        return (
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th className="sortable-header" onClick={this.onSortChange.bind(this, 'fullName')}>Name</th>
                    <th className="sortable-header" onClick={this.onSortChange.bind(this, 'category')}>Category</th>
                    <th className="sortable-header" onClick={this.onSortChange.bind(this, 'phoneNumber')}>Phone</th>
                    <th className="sortable-header" onClick={this.onSortChange.bind(this, 'age')}>Age</th>
                    <th className="action-header">Action</th>
                </tr>
                </thead>
                <tbody>
                {contacts.length > 0 ? contacts : emptyContactView}
                </tbody>

            </Table>
        );
    }

    renderItemsPerPage() {
        return (
            <div className="item-per-page">
                <Row>
                    <Col md={3} sm={4} xs={5} className="page-label">
                        Page Size
                    </Col>
                    <Col md={5} sm={6} xs={7}>
                        <FormControl
                            componentClass="select"
                            placeholder="Select Category"
                            value={this.state.itemsPerPage}
                            onChange={this.onItemsPerPageChange.bind(this)} >
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </FormControl>
                    </Col>
                </Row>
            </div>
        )
    }

    renderPagination() {
        let {currentPage, itemsPerPage} = this.state;
        let contactCount = this.state.contacts.length;

        if(contactCount > 0) {
            let items = [];
            if (contactCount > itemsPerPage) {
                const pageNumbers = Math.ceil(contactCount / itemsPerPage);
                for (let number = 1; number <= pageNumbers; number++) {
                    items.push(
                        <Pagination.Item
                            key={number}
                            onClick={this.onPageChange.bind(this, number)}
                            active={number === currentPage}>
                            {number}
                        </Pagination.Item>
                    );
                }
            } else {
                items.push(<Pagination.Item key={1} active={true} >1</Pagination.Item>)
            }
            return <Pagination bsSize="small">{items}</Pagination>;

        } else {
            return;
        }
    }

    renderTotalCount() {
        let contactCount = this.state.contacts.length;
        return (
            <div className="contact-count">All Contacts = {contactCount}</div>
        );
    }

    render() {

        return (
            <div>
                <CustomNavBar
                    createNewContact={this.createNewContact}
                    updateContact={this.updateContact}
                    deleteContact={this.deleteContact}/>
                <Grid>
                    <Row>
                        {this.renderContactList()}
                    </Row>
                    <Row>
                        {this.renderPagination()}
                    </Row>
                    <Row>
                        <Col sm={4} xs={6}>
                            {this.renderItemsPerPage()}
                        </Col>
                        <Col sm={8} xs={6}>
                            {this.renderTotalCount()}
                        </Col>
                    </Row>

                </Grid>
                <ContactModal
                    show={this.state.isShowContactModal}
                    contact={this.state.editContact}
                    onSave={this.onContactModalSave.bind(this)}
                    onCancel={this.onContactModalCancel.bind(this)}/>
            </div>
        )
    }
}