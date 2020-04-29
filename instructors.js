const fs = require('fs');
const Intl = require('intl');
const data = require('./data.json');
const { age, date } = require('./utils');


//show
exports.show = function(req, res) {
  // req.params.id = /:id/:member
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id;
  });

  if(!foundInstructor) {
    return res.send('Instructor not found!');
  }

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
  }

  return res.render("instructors/show", { instructor });

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
    return res.redirect(`/instructors/${id}`);
  })
  
  
  
};
//edit
exports.edit = function(req, res) { 
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id;
  });

  if(!foundInstructor) {
    return res.send('Instructor not found!');
  }

  // yyyy-mm-dd
  // date(instructor.birth)
  // return yyyy-mm-dd

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth)
  }
  

  return res.render("instructors/edit", { instructor });
};
//put - update

exports.put = function(req, res) {
  const { id } = req.body;
  let index = 0;

  const foundInstructor = data.instructors.find(function(instructor, foundIndex){
    if(id == instructor.id) {
      index = foundIndex;
      return true;
    }
  });

  if(!foundInstructor) {
    return res.send('Instructor not found!');
  } 

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth)
  }

  data.instructors[index] = instructor;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Write file error!");

    return res.redirect(`/instructors/${id}`);
  })

};
//delete
exports.delete = function(req,res) {
  const { id } = req.body;

  const filteredInstructors = data.instructors.filter(function(instructor) {
    return instructor.id != id;
  })

  data.instructors = filteredInstructors;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send ("Write file error!");

    return res.redirect("/instructors");
  })
}