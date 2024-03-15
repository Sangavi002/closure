let container = document.getElementById('container');
let search = document.getElementById('search');

search.addEventListener('input', () => {
    debounce(() => {
        fetchData(search.value);
    }, 1000);
});

let timer;
function debounce(func, delay) {
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        func();
    }, delay);
}

function fetchData(query) {
    fetch(`https://www.omdbapi.com/?apikey=48c5313a&s=${query}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            appendData(data.Search); 
            return data;
        })
        .catch(err => {
            console.log(err);
        });
}

function appendData(movies) {
    container.innerHTML = '';
    movies.forEach(ele => {
        let card = document.createElement('div');
        card.className = 'card';
        
        let img = document.createElement('img');
        img.src = ele.Poster;
        img.alt = 'movie';

        let title = document.createElement('h3');
        title.textContent = `Title: ${ele.Title}`;

        let year = document.createElement('p');
        year.textContent = `Year: ${ele.Year}`;
        year.style.fontSize = '18px'

        card.append(img, title, year);
        container.append(card);
    });
}

let container2 = document.getElementById('container2');
let searchFood = document.getElementById('searchFood');

searchFood.addEventListener('input', () => {
    throttling(() => {
        fetchFoodData(searchFood.value);
    }, 500);
});

let flag = false;//timer is not running

function throttling(func,delay){
    if(flag==true){
        //if timer is running i will simply return or do nothing
        return;
    }
    func()
    
    flag =true;//timer is starting
    setTimeout(function(){
        flag =false;
    },delay)

}

async function fetchFoodData(query){
    try{
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        let data = await res.json();
        console.log(data.meals);
        appendFoodData(data.meals); 
        return data;
    }
    catch(err){
        console.log(err);
    }
}

function appendFoodData(food) {
    container2.innerHTML = '';
    food.forEach(ele => {
        let card = document.createElement('div');
        card.className = 'card';
        
        let img = document.createElement('img');
        img.src = ele.strMealThumb;
        img.alt = 'food';

        let title = document.createElement('h3');
        title.textContent = `Title: ${ele.strMeal}`;

        let category = document.createElement('p');
        category.textContent = `Category: ${ele.strCategory}`;
        
        card.append(img, title, category);
        container2.append(card);
    });
}