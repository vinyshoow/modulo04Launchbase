const currentPage = location.pathname; //pega o nome da página atual
const menuItems = document.querySelectorAll("header .links a"); // seleciona todos os links do menu

for (item of menuItems) {
  if(currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}



