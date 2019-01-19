"use strict";
var User = (function () {
    function User(id, role, name, surname, email, password, image) {
        this.id = id;
        this.role = role;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.image = image;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map