const open = require('../rabbit/producer')
const q = "task"
const arr = ['1', '2', '3', '4', '5']

const runStats = async ({
    done
}) => {
    arr.forEach(v => open
        .then(function (conn) {
            return conn.createChannel();
        })
        .then(function (ch) {
            return ch.assertQueue(q).then(function (ok) {
                return ch.sendToQueue(q, Buffer.from(v));
            });
        })
        .catch(console.warn))

    done();
};

module.exports = runStats;