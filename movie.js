const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH= "https://image.tmdb.org/t/p/w1280";
const SEARCH= "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');

getmovies(APIURL);

    async function getmovies(url){
        const resp=await fetch(url);
        const respdata=await resp.json();
        console.log(respdata);
        showmovies(respdata.results);
        // respdata.results.forEach((movie) => {
        //     const img=document.createElement("img");
        //     img.src=IMGPATH + movie.poster_path;
        //     document.body.appendChild(img);
        // });
    }
    function showmovies(movies){
        main.innerHTML="";
        movies.forEach((movie) => {
            const{
                poster_path,title,vote_average,overview
            }=movie;
             const movieel=document.createElement('div');
             movieel.classList.add('movie');
             movieel.innerHTML=`
             <div class="movie">
        <img src="${IMGPATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getclass(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview"><h3>overview</h3>
        ${overview}
        </div>
        </div>
             `;
             main.appendChild(movieel);
        });
        
    }
    function getclass(vote){
        if(vote>=7){
            return 'green';
        }
        else if(vote>5){
            return 'orange';
        }
        else{
            return 'red';
        }
    }
    form.addEventListener('submit',(e)=>{
e.preventDefault();
const searchv=search.value;
if(searchv){
getmovies(SEARCH + searchv);
    search.value=" ";
}
    })