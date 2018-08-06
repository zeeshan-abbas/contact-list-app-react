import React from 'react';
import './contact.css'

export default function Contact (props) {
    const {contact, index} = props;
    return (
        <tr className="contact-row">
            <td>
                <input type="checkbox"
                       checked={props.selectedContacts.indexOf(index) >= 0}
                       onChange={props.onCheckChange}/>
            </td>
            <td>{contact.fullName}</td>
            <td>{contact.category}</td>
            <td>{contact.phoneNumber}</td>
            <td>{contact.age}</td>
            <td className="action-icon">
                <img onClick={props.onEditContact} src="/images/icon_edit.png" alt="Update" />
            </td>
        </tr>
    )
}