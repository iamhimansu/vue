export default class Model {
    constructor() {
    }
    static getClassName() {
        return this.constructor.name; // 'this' refers to the current class
    }
    rules() {
        return [];
    }

    static find(){
        console.log(this.getClassName())
    }

}