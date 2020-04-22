function age(timestamp) {
  const today = new Date(); //dia de hoje
  const birthDate = new Date(timestamp); // dia do aniversário

  let age = today.getFullYear() - birthDate.getFullYear; // pega o ano menos o ano do aniversário

  const month = today.getMonth() - birthDate.getMonth();

  if(month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
    age = age - 1;
  }

  return age;
}