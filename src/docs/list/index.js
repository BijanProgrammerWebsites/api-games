const all = require('./all');
const add = require('./add');
const remove = require('./remove');

function generatePaths(route) {
    const paths = {};

    paths[`/${route}/all`] = {...all.generateDoc(route)};
    paths[`/${route}/add`] = {...add.generateDoc(route)};
    paths[`/${route}/remove`] = {...remove.generateDoc(route)};

    return paths;
}

module.exports = {
    generatePaths,
};
