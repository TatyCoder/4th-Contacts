class Contact {
    id;
    name;
    address;
    phone;
    isNewContact = false;

    constructor(id /* Number */, name /* String */, address /* Address object */, phone /* String */) {
        if (id === null) {
            this.id = Math.random().toString()
        } else {
            this.id = id
        };
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

    saveUpdatedContactHandler = async () => {
        this.name = document.getElementById('name').value;
        this.address.street = document.getElementById('street').value;
        this.address.city = document.getElementById('city').value;
        this.address.state = document.getElementById('state').value;
        this.address.zip = document.getElementById('zip').value;
        this.phone = document.getElementById('phone').value;

        if (this.isNewContact === true) {
            let response = await fetch('https://phone-contacts-service-yckhe.ondigitalocean.app/addContact', {
                method: 'POST',
                body: JSON.stringify(this),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const contactJson = await response.json();
            console.log(contactJson);
            contacts.push(this);
            this.isNewContact = false;
        } else {
            let response = await fetch('https://phone-contacts-service-yckhe.ondigitalocean.app/updateContactByID', {
            method: 'POST',
            body: JSON.stringify(this),
            headers: {
                'Content-Type': 'application/json'
            }
            });
            
            const contactJson = await response.json();
            console.log(contactJson);
        }

        showAllContacts();
    }

    render() {
        const newContactElement = document.createElement('div');
        const addressHtml = this.address.render();

        newContactElement.innerHTML = `
      <div class='contact-element'>
        <b>${this.name}</b>
         ${addressHtml}
        <p>${this.phone}</p>
        <button class= "deleteContactButton" id="deleteContactButton${this.id}">Delete</button>
        <button class="updateContactButton" id="updateContactButton${this.id}">Update</button>
      </div>
    `;
        const contactsList = document.getElementById('contacts');
        contactsList.append(newContactElement);

        const updateContactButton = document.getElementById('updateContactButton' + this.id);
        updateContactButton.addEventListener('click', this.renderUpdate.bind(this));

        const deleteContactButton = document.getElementById('deleteContactButton' + this.id);
        deleteContactButton.addEventListener('click', deleteContactHandler.bind(null, this));
    }
}