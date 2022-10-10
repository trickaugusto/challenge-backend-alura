function startsWithCapital(word){
    return word[0].toUpperCase() + word.substr(1);
}

module.exports = startsWithCapital;