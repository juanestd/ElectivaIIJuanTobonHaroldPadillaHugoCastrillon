class DeleteTweetCommand {
    constructor(tweetRepository) {
        this.tweetRepository = tweetRepository;
    }

    async execute(tweetId) {
        await this.tweetRepository.deleteTweetById(tweetId);
    }
}

module.exports = DeleteTweetCommand;
