import Model from "@/app/Model";

export default class Article extends Model{
    constructor(articleObject, db) {
        super();
        this.title = articleObject.title;
        this.slug = null;
        this.json_content = articleObject.json_content;
        this.content = articleObject.json_content;
        this.db = db;
        this.previousArticles = [];
    }

    validate() {
        this.errors = [];
        if (!this.title.length) {
            this.errors.push({attribute: 'title', message: 'Title is a required field.'});
        }
        if (!this.json_content.length) {
            this.errors.push({attribute: 'json_content', message: 'Content is a required field.'});
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

        this.db.exec("BEGIN;"); //transaction

        const query = `
        INSERT INTO articles (title, slug, json_content, content, createdAt)
        VALUES (:title,:slug,:json_content,:content,:createdAt)
      `;
        const slugify = require('slugify');
        const slug = slugify(this.title, { lower: true});
        const stmt = this.db.prepare(query);
        stmt.bind({
            ":title": this.title,
            ":slug": slug,
            ":json_content": this.json_content,
            ":content": this.content,
            ":createdAt": new Date().getTime()
        });
        stmt.run();
        stmt.free();
        this.db.exec('COMMIT;');
        const selectUsers = `SELECT * FROM articles`;
        //
        const stmt1 = this.db.prepare(selectUsers);
        //
        while (stmt1.step()) {
            this.previousArticles.push(stmt1.getAsObject())
        }
        stmt1.free();

        console.log(this.previousArticles);
    }
}