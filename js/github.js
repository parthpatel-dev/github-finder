class Github {
    constructor() {
        this.client_id = 'fd160aeec675be904013';
        this.client_secret = '0dfc3df23940ee4d79cace3a536eed2e346f0ec4';
        this.repos_count = 5;
        this.repos_sort = 'stars';
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profileData = await profileResponse.json();
        const reposData = await reposResponse.json();

        return {
            profile: profileData,
            repos: reposData,
        };
    }
}
