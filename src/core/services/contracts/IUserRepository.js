class IUserRepository {
    constructor() {
        if (this.constructor === IUserRepository) {
            throw new Error("Cannot instantiate an interface directly.");
        }
    }

    async create(user) {
        throw new Error("Method 'create' must be implemented.");
    }

    async getById(id) {
        throw new Error("Method 'getById' must be implemented.");
    }

    async update(id, user) {
        throw new Error("Method 'update' must be implemented.");
    }

    async delete(id) {
        throw new Error("Method 'delete' must be implemented.");
    }

    async getByUsername(username) {
        throw new Error("Method 'getByUsername' must be implemented.");
    }
}

module.exports = IUserRepository;
