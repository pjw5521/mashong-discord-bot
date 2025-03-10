export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    githubToken: process.env.GITHUB_TOKEN,
    discord: {
        token: process.env.DISCORD_TOKEN,
    },
    mongoURI: process.env.MONGO_URI,
});
