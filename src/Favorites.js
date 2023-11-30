export class Favorites {
  constructor(root){
    this.root = document.querySelector(root);
    this.load();
  }

  load(){
    this.entries = [
      {
        login: 'MarcosAlmeidaFreitas',
        name: 'Marcos Antonio Almeida',
        public_repos: '30',
        followers: '0'
      },
      {
        login: 'maykbrito',
        name: 'Mayk Brito',
        public_repos: '76',
        followers: '120000'
      },
      {
        login: 'diego3g',
        name: 'Diego Fernandes',
        public_repos: '120',
        followers: '150000'
      }
    ];
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

    this.entries.forEach(user => {
      console.log(user);
      let row = this.createRow();
      
      // row.querySelector('.user img').src = `https://github.com/${user.login}.png`;
      row.querySelector('.user p').textContent = user.name;

      this.tbody.append(row);
    });
  }

  createRow(){
    const tr = document.createElement('tr');

    const content = `
    td class="user">
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