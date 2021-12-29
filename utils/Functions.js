const Functions =  {
    normalize(value, min, max) {
        return (value - min) / (max - min);
    }          
}

module.exports = Functions;