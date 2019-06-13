import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext)
    const { filterContacts, clearFilter, filtered } = contactContext;
    const keyword = useRef('');
    
    useEffect(() => {
        if (filtered === null) {
            keyword.current.value = '';
        }
    })

    const onChange = e => {
        if (keyword.current.value !== '') {
            filterContacts(e.target.value);
        }
        else {
            clearFilter()
        }
    }

    return (
        <form>
            <input ref={keyword} type="text" placeholder="Filter Contacts..." onChange={onChange} />
        </form>
    )
}

export default ContactFilter
