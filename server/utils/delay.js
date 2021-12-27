module.exports.delay = async (ms = 0) =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
