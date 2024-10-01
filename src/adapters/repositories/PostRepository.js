const mongoose = require('mongoose');

class PostRepository {
    constructor() {
        this.model = mongoose.model('Post', new mongoose.Schema({
            username: String,
            message: String,
            date: { type: Date, default: Date.now }
        }));
    }

    async findByUsername(username) {
        return await this.model.find({ username });
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async save(post) {
        const newPost = new this.model(post);
        return await newPost.save();
    }

    async update(id, post) {
        return await this.model.findByIdAndUpdate(id, post, { new: true });
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
}

module.exports = PostRepository;
