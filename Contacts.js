class Contact {
    name;
    address;
    phone;
    isNewContact = false;

    constructor(name /* String */, address /* Address object */, phone /* String */) {
        this.name = name;
        this.address = address;
        this.phone = phone;
    }

    renderUpdate() {
        const updateContactElement = document.createElement('div');
        updateContactElement.innerHTML = `
        <div id="addForm">
        <form id="form">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" value="${this.name}"/>
            <label for="street">Street</label>
            <input type="text" name="street" id="street" value="${this.address.street}"/>
            <label for="city">City</label>
            <input type="text" name="city" id="city" value="${this.address.city}"/>
            <label for="state">State</label>
            <input type="text" name="state" id="state" value="${this.address.state}"/>
            <label for="zip">Zip Code</label>
            <input type="text" name="zip" id="zip" value="${this.address.zip}"/>
            <label for="phone">Phone</label>
            <input type="text" name="phone" id="phone" value="${this.phone}"/>
        </form>
        <div class="actions">
            <button id="cancelUpdateContactButton">Cancel</button>
            <button id="saveUpdateContactButton">Save</button>
        </div>
    </div>
    `;

        const updateForm = document.getElementById('updateForm');
        updateForm.append(updateContactElement);

// Making cancelUpdateContactButton works:
        const cancelUpdateContactButton = document.getElementById('cancelUpdateContactButton');
        cancelUpdateContactButton.addEventListener('click', showAllContacts);

// Making saveUpdateContactButton works:
        const saveUpdateContactButton = document.getElementById('saveUpdateContactButton');
        saveUpdateContactButton.addEventListener('click', this.saveUpdatedContactHandler);
    }
    
    saveUpdatedContactHandler = () => {
        this.name = document.getElementById('name').value;
        this.address.street = document.getElementById('street').value;
        this.address.city = document.getElementById('city').value;
        this.address.state = document.getElementById('state').value;
        this.address.zip = document.getElementById('zip').value;
        this.phone = document.getElementById('phone').value;

        if (this.isNewContact === true) {
            contacts.push(this);
            this.isNewContact = false;
        }

        showAllContacts();
    }

    render() {
        const randomID = Math.random().toString();
        const newContactElement = document.createElement('div');
        const addressHtml = this.address.render();

        newContactElement.innerHTML = `
      <div class='contact-element'>
        <b>${this.name}</b>
         ${addressHtml}
        <p>${this.phone}</p>
        <button class= "deleteContactButton" id="deleteContactButton${randomID}">Delete</button>
        <button class="updateContactButton" id="updateContactButton${randomID}">Update</button>
      </div>
    `;
        const contactsList = document.getElementById('contacts');
        contactsList.append(newContactElement);

        const updateContactButton = document.getElementById('updateContactButton' + randomID);
        updateContactButton.addEventListener('click', this.renderUpdate.bind(this));

        const deleteContactButton = document.getElementById('deleteContactButton' + randomID);
        deleteContactButton.addEventListener('click', deleteContactHandler.bind(null, this.name));
    }
}
