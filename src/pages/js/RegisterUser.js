class RegisterModel {
    constructor(userObject, db) {
        this.name = userObject.name;
        this.email = userObject.email;
        this.password = userObject.password;
        this.db = db;
    }

    validate() {
        this.errors = [];
        if (!this.name.length) {
            this.errors.push({attribute: 'name', message: 'Name cannot be empty.'});
        }
        if (!this.email.length) {
            this.errors.push({attribute: 'email', message: 'Email cannot be empty.'});
        }
        if (!this.password.length) {
            this.errors.push({attribute: 'password', message: 'Password cannot be empty.'});
        }
        // if (this.password !== this.passwordConfirm) {
        //     this.errors.push({attribute: 'passwordConfirm', message: 'Passwords dont match.'});
        // }
        return this.errors.length === 0;
    }

    collectErrors() {
        this.validate();
        return this.errors;
    }

    save() {
        if (this.validate()) {
            this.insertData();
        } else {
            console.log(this.errors)
        }
    }

    insertData() {
        const query = `
        INSERT INTO core_users (name, email, password, passwordHash, createdAt)
        VALUES (:name,:email,:password,:passwordHash,:createdAt)
      `;
        const stmt = this.db.prepare(query);
        stmt.bind({
            ":name": this.name,
            ":password": this.password,
            ":passwordHash": this.password,
            ":email": this.email,
            ":createdAt": new Date().toISOString()
        });
        stmt.run();
        stmt.free();

        const selectUsers = `SELECT * FROM core_users`;
        //
        const stmt1 = this.db.prepare(selectUsers);
        //
        while (stmt1.step()) {
            console.log(stmt1.getAsObject());
        }
        stmt1.free();
    }
}

export default RegisterModel;