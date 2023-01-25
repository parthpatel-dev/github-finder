// Init Github
const github = new Github();

// Get profile div
const profile = document.getElementById('profile');

// Search input
const searchBar = document.getElementById('searchBar');

// Display profile in UI
function displayUserProfile(user) {
    profile.innerHTML = `
        <div class="card card-body mb-3 bg-dark bg-gradient text-light">
            <div class="row">
                <div class="col-md-3">
                    <img class="img-fluid mb-2" src="${user.avatar_url}">
                    <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
                    
                </div>
                <div class="col-md-9 text-center">
                    <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                    <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                    <span class="badge badge-success">Public Followers: ${user.followers}</span>
                    <span class="badge badge-info">Public Following: ${user.following}</span>
                    <br><br>
                    <ul class="list-group">
                        <li class="list-group-item bg-dark text-light">Company: ${user.company}</li>
                        <li class="list-group-item bg-dark text-light">Website: ${user.blog}</li>
                        <li class="list-group-item bg-dark text-light">Location: ${user.location}</li>
                        <li class="list-group-item bg-dark text-light">Member Since: ${user.created_at}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col text-center">
            <a href="${user.html_url}?tab=repositories" target="_blank" class="btn btn-primary btn-block mb-4">View Repositories</a>
        </div>
        <hr class="page-heading mb-3>Latest Repos</h3>
        <div id="repos"></div>
    `;
}

// Show user repos
function displayUserRepos(userRepos) {
    let output = '';
    userRepos.forEach((repo) => {
        output += `
            <div class="card card-body mb-2 bg-dark bg-gradient text-light">
                <div class="row">
                    <div class="col-md-6" text-light>
                        <a href="${repo.html_url}" class="link-success" target="_blank">${repo.name}</a>
                    </div>
                    <div class="col-md-6 text-right">
                        <span class="badge badge-primary bg-dark text-light">Stars: ${repo.stargazers_count}</span>
                        <span class="badge badge-secondary bg-dark text-light">Watchers: ${repo.watchers_count}</span>
                        <span class="badge badge-success bg-dark text-light">Forks: ${repo.forms_count}</span>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('repos').innerHTML = output;
}

function clearUserProfile() {
    profile.innerHTML = '';
}

function clearUserRepos() {
    document.getElementById('repos').innerHTML = '';
}

// Seach input event listener
searchBar.addEventListener('keyup', (e) => {
    // Get input text
    const userName = e.target.value;

    if (userName !== '') {
        // Make http call
        github.getUser(userName).then((userData) => {
            if (userData.profile.message !== 'Not Found') {
                // Show user profile & repos
                displayUserProfile(userData.profile);
                displayUserRepos(userData.repos);
            }
        });
    } else {
        // Clear user profile
        clearUserProfile();
        // Clear user repos
        clearUserRepos();
    }
});
