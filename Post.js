class Post {
    constructor(title, body, associatedID) {
        this.title = title;
        this.body = body;
        console.log("body in class");
        console.log(this.body);
        this.associatedID = associatedID;
    }

    getTitle() {
        return this.title;
    }

    setTitle(title) {
        this.title = title;
    }

    getBody() {
        return this.body;
    }

    setBody(body) {
        this.body = body;
    }

    getID() {
        return this.associatedID;
    }

    setID(associatedID) {
        this.associatedID = associatedID;
    }

}


module.exports = { Post };