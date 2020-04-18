const fs = require('fs');
const data = require('./data.json');

//show
exports.show = function(req, res) {
  // req.params.id = /:id/:member
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id;
  });

  if(!foundInstructor) {
    return res.send('Instructor not found');
  }
  return res.send(foundInstructor);

};
// create
exports.post = function(req, res) {

  const keys = Object.keys(req.body);
  let { avatar_url, name, birth, services, gender} = req.body;
  
  for(let key of keys) {
    //req.body.key
    if(req.body[key] == ""){
      return res.send("Por favor, preencha todos os campos");
    }
  }
  birth = Date.parse(birth); // muda a data informada para o formato date.now
  const created_at = Date.now(); // cria um campo com a data atual do cadastro.
  const id = Number(data.instructors.length + 1);

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at
  });

  fs.writeFile("data.json",JSON.stringify(data, null, 2), function(err){
    if(err) {
      return res.send("Erro ao gravar o arquivo");
    }
    return res.redirect('/instructors');
  })
  
  
  
}

// update

//delete