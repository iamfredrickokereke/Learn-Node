console.log('Before');

// setTimeout(() => {
//     console.log('Returned from database!');    
// }, 2000)

getUser(15, function (user) {
    getRepositories(user.gitHubUsername, getRepos)
});
console.log('After');




function getRepos(repo) {
    getCommits(repo, getCommits)  
    
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from the database');
        callback({id : id, gitHubUsername: 'mosh'});        
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        callback(['repo1', 'repo2', 'repo3'])
    }, 2000);
}


function getCommits(commits) {
  console.log(commits);  
}