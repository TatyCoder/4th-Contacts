let contacts = [];

async function fetchContacts() {
    let response = await fetch('https://phone-contacts-service-yckhe.ondigitalocean.app/getAllContacts', {method: 'GET'});
    const contactJson = await response.json();
    for (const cj of contactJson) {
        const myContact = new Contact(
            cj.name,
            new Address(cj.address.street, cj.address.city, cj.address.state, cj.address.zip),
            cj.phone
        )
        contacts.push(myContact);
    }
    console.log(contacts);
    showAllContacts();
}

const addNewContactHandler = () => {
    const c = new Contact('', new Address('', '', '', ''), '');
    c.isNewContact = true;
    c.renderUpdate();
}

const deleteContactHandler = (name) => {
    let contactIndex = 0;
    for (const contact of contacts) {
        if (contact.name === name) {
            break;
        }
        contactIndex++;
    }
    contacts.splice(contactIndex, 1);
    const listRoot = document.getElementById('contacts');
    listRoot.children[contactIndex].remove();

    console.log(name);
}

const showAllContacts = () => {
    //  const updateList = document.getElementById('contacts');
    removeAllChildNodes('contacts');
    // const updateForm = document.getElementById('updateForm');
    removeAllChildNodes('updateForm');
    for (i = 0; i < contacts.length; i++) {
        contacts[i].render();
    }
}

const removeAllChildNodes = (nodeID /* string */ ) => {
    const parent = document.getElementById(nodeID);
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchContacts();

const addNewContactButton = document.getElementById('addNewContactButton');
addNewContactButton.addEventListener('click', addNewContactHandler);