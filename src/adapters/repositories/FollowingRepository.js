const Following = require('../../core/domain/Following');
const mongoose = require('mongoose');

class FollowingRepository {
    constructor() {
        this.model = mongoose.model('Following', new mongoose.Schema({
            username: String,
            followingUsername: String,
        }));
    }

    async findByUsername(username) {
        return await this.model.find({ username });
    }

    async save(following) {
        const newFollowing = new this.model(following);
        return await newFollowing.save();
    }

    async update(id, following) {
        return await this.model.findByIdAndUpdate(id, following, { new: true });
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async countByUsername(username) {
        return await this.model.countDocuments({ username });
    }
}

module.exports = FollowingRepository;
