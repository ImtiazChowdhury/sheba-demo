function queryParser (req){
    return req.query;
}
module.exports.queryParser = queryParser;

function parameterParser(req){
    return req.params;
}
module.exports.parameterParser = parameterParser;

function formidableFormParser(req){
    return req.fields;
}
module.exports.formidableFormParser = module.exports.formParser = formidableFormParser;