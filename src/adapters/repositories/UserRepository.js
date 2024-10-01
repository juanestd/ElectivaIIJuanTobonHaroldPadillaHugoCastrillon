const User = require('../../core/domain/User');
const mongoose = require('mongoose');

class UserRepository {
    constructor() {
        this.model = mongoose.model('User', new mongoose.Schema({
            username: String,
            password: String,
        }));
    }

    async save(user) {
        const newUser = new this.model(user);
        return await newUser.save();
    }

    async findByUsernameAndPassword(username, password) {
        return await this.model.findOne({ username, password });
    }
}

module.exports = UserRepository;
