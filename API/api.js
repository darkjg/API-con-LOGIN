const  axios  = require("axios");
const expres = require("express");

const app = expres();
const url="https://rickandmortyapi.com/api/character/?name=";

/*
app.get('/character', async (req, res) => {

    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        const characters = response.data.results
        res.json(characters)
    } catch (error) {
        res.status(404).json({ error: 'personaje no encontrado' });
    }
});
*/

async function  character(){
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    const characters = response.data.results
    return characters;
}


async function findCharacter(nombre){
    const url="https://rickandmortyapi.com/api/character/?name=";
    const urlEnd= `${url}${nombre}`  
    try {
        const response= await axios.get(urlEnd);
        const{results:{0:{name, status,species,gender,image,origin}}}=response.data 
        return results;
    } catch (error) {
        
    }

}



module.exports = {character,findCharacter};