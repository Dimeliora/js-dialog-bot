const answers = {
    foo: 'Answer on foo keyword',
    bar: 'Bar keyword answer though',
    buzz: 'Some shit on buzz keyword',
};

const answersTemplate = new RegExp(Object.keys(answers).join('|'), 'i');

module.exports.answers = answers;
module.exports.answersTemplate = answersTemplate;
