module.exports = {
  age: function (timestamp) {
    const today = new Date(); //dia de hoje
    const birthDate = new Date(timestamp); // dia do aniversário
  
    let age = today.getFullYear() - birthDate.getFullYear(); // pega o ano menos o ano do aniversário
  
    const month = today.getMonth() - birthDate.getMonth();
  
    if(month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
      age = age - 1;
    }
  
    return age;
  },

  date: function (timestamp) {
    const date = new Date(timestamp);

    //yyyy
    const year = date.getUTCFullYear();
    // mm
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    // dd
    const day = `0${date.getUTCDate()}`.slice(-2);

    return `${year}-${month}-${day}`;
  }
}