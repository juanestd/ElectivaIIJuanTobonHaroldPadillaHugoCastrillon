const IUserRepository = require('../../core/services/contracts/IUserRepository');
const { UserModel } = require('../database/models/userModel');
const UserMapper = require('../../core/services/mapping/UserMapper');

class UserRepository extends IUserRepository {
    async create(user) {
        try {
            const existingUser = await UserModel.findOne({
                $or: [{ username: user.username }, { email: user.email }]
            });

            if (existingUser) {
                const field = existingUser.username === user.username ? 'username' : 'email';
                throw new Error(`A user with this ${field} already exists`);
            }

            const userDocument = new UserModel(UserMapper.toPersistence(user));
            const savedUser = await userDocument.save();
            return UserMapper.toDomain(savedUser);
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            const userDocument = await UserModel.findById(id);
            return userDocument ? UserMapper.toDomain(userDocument) : null;
        } catch (error) {
            throw error;
        }
    }

    async update(id, user) {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(id, UserMapper.toPersistence(user), { new: true });
            return updatedUser ? UserMapper.toDomain(updatedUser) : null;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            await UserModel.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    async getByUsername(username) {
        try {
            const userDocument = await UserModel.findOne({ username });
            return userDocument ? UserMapper.toDomain(userDocument) : null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserRepository;
