

var rs = new require('redis-session')();

var appName = 'rs-project-session';

module.exports = {
    create,
    kill
}

function create(userID, token){
    rs.create({
        app: appName,
        id: userID,
        d: {
            token: token
        }, function (err, resp) {
            console.log(resp);
        }
    })
}

function kill(userID){
    rs.kill({
        app: appName,
        id: userID
    })
}