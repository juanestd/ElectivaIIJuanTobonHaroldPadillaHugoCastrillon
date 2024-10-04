class IAuthService {
    constructor() {
        if (this.constructor === IAuthService) {
            throw new Error("Cannot instantiate an interface directly.");
        }
    }

    async authenticate(credentials) {
        throw new Error("Method 'authenticate' must be implemented.");
    }

    async generateToken(user) {
        throw new Error("Method 'generateToken' must be implemented.");
    }

    async verifyToken(token) {
        throw new Error("Method 'verifyToken' must be implemented.");
    }
}

module.exports = IAuthService;
