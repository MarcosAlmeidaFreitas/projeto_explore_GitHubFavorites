export class GitHubUser{
  static search(username){
    const endpoint = `https://api.github.com/users/${username}`

    return fetch(endpoint)
    .then(data => data.json())
    .then(({login, name, public_repos, followers}) => {})
  }
}
export class Favorites {
  constructor(root){
    this.root = document.querySelector(root);
    this.load();
  }

  load(){
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || [];
  }

  delete(user){
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login);
    this.entries = filteredEntries;
    this.update();
  }
}

export class FavoritesView extends Favorites{
  constructor(root){
    super(root);

    this.tbody = this.root.querySelector('table tbody');

    this.update();
  }

  update(){
    this.removeAllTr();

    
    this.entries.forEach((user) => {
      console.log(user);
      
      const row = this.createRow();
      
      row.querySelector('.user img').src = `https://github.com/${user.login}.png`;
      row.querySelector('.user img').alt = `Imagem do usuário ${user.name}`;
      row.querySelector('.user p').textContent = user.name;
      row.querySelector('.user span').textContent = user.login;
      row.querySelector('.repositories').textContent = user.public_repos;
      row.querySelector('.followers').textContent = user.followers;
      
      row.querySelector('.buttonRemove').onclick = () => {
        const isOk = confirm(`Tem certeza que deseja deletar o usuário: ${user.name}`);
        if(isOk){
          this.delete(user);
        }
      }

      this.tbody.append(row);
    });
  }

  createRow(){
    const tr = document.createElement('tr');

    const content = `
    <td class="user">
      <img src="" alt="">
      <a href="" target="_blank">
        <p></p>
        <span></span>
      </a>
    </td>
    <td class="repositories"></td>
    <td class="followers"></td>
    <td><button class="buttonRemove">&times;</button></td>
    `
    tr.innerHTML = content;
    
    return tr;
  }

  removeAllTr(){
    this.tbody.querySelectorAll('tr')
      .forEach((tr) => {
        tr.remove();
    });
  }
}