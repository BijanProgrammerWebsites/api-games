import components from './components.js';
import user from './user/index.js';

export default {
    openapi: '3.0.3',
    info: {
        title: 'Games Server',
        version: '1.0.0',
    },
    ...components,
    paths: {
        ...user.paths,
    },
};
