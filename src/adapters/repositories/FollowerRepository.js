const Follower = require('../../core/domain/Follower');
const mongoose = require('mongoose');

class FollowerRepository {
    constructor() {
        this.model = mongoose.model('Follower', new mongoose.Schema({
            username: String,
            followerUsername: String,
        }));
    }

    async findByUsername(username) {
        return await this.model.find({ username });
    }

    async save(follower) {
        const newFollower = new this.model(follower);
        return await newFollower.save();
    }

    async update(id, follower) {
        return await this.model.findByIdAndUpdate(id, follower, { new: true });
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async countByUsername(username) {
        return await this.model.countDocuments({ username });
    }
}

module.exports = FollowerRepository;
