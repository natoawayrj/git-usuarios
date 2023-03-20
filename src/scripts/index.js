document.getElementById('btn-search').addEventListener('click',()=>{
   const userName = document.getElementById('input-search').value
    
   getUserProfile(userName)

})
document.getElementById('input-search').addEventListener('keyup',(e)=>{
   const userName = e.target.value
   const key = e.which || e.keyCode
   const isEnter = key === 13
   if(isEnter){
      getUserProfile(userName)
   }

})


async function user(userName){
   const response = await fetch(`https://api.github.com/users/${userName}`)
   return await response.json()
}

async function repos(userName){
   const response = await fetch(`https://api.github.com/users/${userName}/repos`)
   return await response.json()
}
//na função user, pegamos os dados do usuário no git com o fetch e cabe a gente pegar a informação desejada para por no html
 function getUserProfile(userName){
 
   repos(userName).then(reposData =>{
      console.log(reposData)
   })  

   user(userName).then( userData =>{
        let userInfo =`  <div class="info"> 
                           <img src="${userData.avatar_url}" alt="foto do perfil"/>
                           <div class="data">
                               <h2>${userData.name ?? 'Não possui nome cadastrado 😒'}</h2>
                               <p>${userData.bio ?? 'Não possui bio cadastrada 😒'}</p>
                               <p> Seguindo: ${userData.following ?? 'Não segue ninguém 😁'}</p>
                               <p>Seguidores: ${userData.followers ?? 'Não possui seguidores 😒'}</p>
                           </div>
                        </div>`
                    document.querySelector('.profile-data').innerHTML = userInfo  

                    getUserRepositories(userName)
   })

}
   
    
function getUserRepositories(userName){
   repos(userName).then(reposData => {
      let repositoriesItens = ""
      reposData.forEach(repo => {
         repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}
         <p>linguagem: ${repo.language}</p>
         <p>Forks: ${repo.forks_count} </p>
         <p>Watchers: ${repo.watchers_count}</p>
         <p>Stars: ${repo.stargazers_count}</p>
         </a> </li>`
      });

      document.querySelector('.profile-data').innerHTML += `
      <div class="repositories section">
         <h2>Repositories</h2>
         <ul>${repositoriesItens}</ul>
      </div>   `
   })

}
  