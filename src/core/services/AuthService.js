class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async registerUser(user) {
        
        return await this.userRepository.save(user);
    }

    async loginUser(username, password) {
        return await this.userRepository.findByUsernameAndPassword(username, password);
    }
}

module.exports = AuthService;
