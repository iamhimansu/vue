import Model from "@/app/Model";

export default class RegisterModel extends Model{
    constructor(userObject, db) {
        super();
        this.name = userObject.name;
        this.email = userObject.email;
        this.password = userObject.password;
        this.passwordConfirm = userObject.passwordConfirm;
        this.db = db;
        this.previousUsers = [];
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
        } else if (this.password.length < 8) {
            this.errors.push({attribute: 'password', message: 'Password should be greater than 8 characters.'});
        } else if (this.password !== this.passwordConfirm) {
            this.errors.push({attribute: 'passwordConfirm', message: 'Passwords dont match.'});
        }
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

        this.db.exec("BEGIN;");

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
            ":createdAt": new Date().getTime()
        });
        stmt.run();
        stmt.free();
        this.db.exec('COMMIT;');
        const selectUsers = `SELECT * FROM core_users`;
        //
        const stmt1 = this.db.prepare(selectUsers);
        //
        while (stmt1.step()) {
            this.previousUsers.push(stmt1.getAsObject())
        }
        stmt1.free();

        console.log(this.previousUsers);
    }
}