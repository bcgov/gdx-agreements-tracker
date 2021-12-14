const authPreHandler = async (isAuth) => {
    if ( isAuth ) {
        return true;
    }
}

module.exports = authPreHandler;