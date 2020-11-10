class Address {
    street;
    city;
    state;
    zip;

    constructor(street, city, state, zip) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    render() {
        const innerHTML = `
        <p>${this.street}</p>
        <p>${this.city}</p>
        <p>${this.state}</p>
        <p>${this.zip}</p>
      `;
        return innerHTML;
    }
}
