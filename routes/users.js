const express = require('express');
const router = express.Router();
const { generateToken, verifyToken } = require('../middlewares/authMiddleware');
const { users } = require('../data/users');
const api = require("../API/api.js");
const  axios  = require("axios");

router.get('/', (req, res) => {
    const Template = `
        <h1>Bienvenido</h1>
        <form action="/login" method="post">
          <label for="username">Usuario:</label>
          <input type="text" id="username" name="username" required><br>
  
          <label for="password">Contraseña:</label>
          <input type="password" id="password" name="password" required><br>
  
          <button type="submit">Iniciar sesión</button>
        </form>
      `;

    res.send(Template);

});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(
        (user) => user.username === username && user.password === password
    );

    if (user) {
        const token = generateToken(user);
        req.session.token = token;
        console.log(req.session.cookie)
        res.redirect('/characters');
    } else {
        res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
});


router.get('/characters', async (req, res) => {
    const personajes = await api.character();
    res.json(personajes)
})

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/search', verifyToken, (req, res) => {

    res.send(`
    <h1>Buscador Rick & Morty</h1>
    <label for="characterName">Introduce el nombre de tu personaje</label>   
    <form action="/busqueda" method="post">
        <input type="text" id="characterName" name="name" placeholder="Rick">
        <button  type="submit">Obtener Informacion</button>
    </form>
    `)
})

router.post("/busqueda",async function(req, res) {
    
    res.redirect('/character/'+req.body.name);
   
   
})

router.get("/character/:nombre", verifyToken, async (req, res) => {
   
    const charactName = req.params.nombre;    
 

   
    try {

        const results=  await api.findCharacter(charactName)
        const { results: { 0: { name, status, species, gender, image, origin } } } = results
        res.send(`
        <h2>${name}</h2>
        <img src="${image}" alt="${name}"/>
        <p>${status}</p>           
        <p>${species}</p> 
        <p>${gender}</p>
        <p>${origin.name}</p>
        `)
        if (originNombre != "unknown") {
            info.innerHTML += `
        <p>${originNombre}</p> 
        `}

    } catch {
        res.status(404).json({error:"Personaje no encontrado"})
    }
})




module.exports = router;