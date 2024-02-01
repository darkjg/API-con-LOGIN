const axios = require("axios");
const expres = require("express");

const app = expres();
const url = "https://rickandmortyapi.com/api/character/?name=";



async function character() {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    const characters = response.data.results
    return characters;
}


async function findCharacter(nombre) {
    const url = "https://rickandmortyapi.com/api/character/?name=";
    const urlEnd = `${url}${nombre}`    
    const response = await axios.get(urlEnd);   
    return response.data;


}



module.exports = { character, findCharacter };