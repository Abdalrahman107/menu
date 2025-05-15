const openMenyBtn = $('.open-menu');
const closeMenyBtn = $('.close-menu');
const sideBar = $('.side-bar');
const sideMenu = $('.side-menu');
const sideBtns = $('.side-btns');
const allMeals = $('.meal');
const meals = $('.meals');
const mealDetails = $('.meal-details');
const searchBtn = $('.search-btn');
const categoryBtn = $('.category-btn');
const searchPage = $('.search-page');
const searchName = $('.search-name');
const searchLetter = $('.search-letter');
const searchMeals = $('.results');
const loader = $('.loader');


const getMealCards = (data) => {
    const allMeals = data.meals;

    let mealsBox = ''

    if(allMeals == null){
    searchMeals.html(null);
    return
}


    for(let i=0; i<allMeals.length; i++){
    mealsBox+=`
        <button id=${allMeals[i].idMeal} class="meal cursor-pointer w-full relative overflow-hidden rounded-lg ">
        <img src="${allMeals[i].strMealThumb}" alt="" class="w-full">
        <div class="absolute bottom-0 right-0 left-0 top-[150%] bg-gray-50/80 flex text-4xl items-center p-4 transition-all duration-700 ">${allMeals[i].strMeal}</div>
        </button>
    `
    }

    return mealsBox;
}


// ======================================================================================


const getMealById = async()=>{
    loader.removeClass('hidden').addClass('flex');
    document.body.classList.add('overflow-hidden');
     
    $('.meal').each( function () {
    $(this).on('click', async() => {
        const id = $(this).attr('id');
        console.log(id);

        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        console.log(data);

        let recipyBox = ''

        for(let i=1; i<21; i++){
            recipyBox+=`
            ${data.meals[0][`strIngredient${i}`]? 
                    `
                        <span class="text-gray-800 bg-sky-300 p-2 rounded-lg">
                        ${data.meals[0][`strMeasure${i}`]} ${data.meals[0][`strIngredient${i}`]}
                        </span>
                    `
                    :
                    ""
            }

            `
        }

        mealDetails.removeClass('hidden').addClass('flex');
        meals.addClass('hidden').removeClass('flex');
        searchPage.addClass('hidden').removeClass('block');

        mealDetails.html(`
                        <div class="w-1/3">
                    <img src="${data.meals[0].strMealThumb}" alt="" class="w-full rounded-lg">
                    <h2 class="text-4xl font-semibold ml-8 text-white">${data.meals[0].strMeal}</h1>
                </div>
                <div class="text-white w-2/3">
                    <h2 class="text-4xl font-semibold">Instructions</h2>
                    <p class="py-4">${data.meals[0].strInstructions}</p>
                    <p class="text-4xl font-semibold">Area : <span class="font-normal">${data.meals[0].strArea}</span></p>
                    <p class="py-2 text-4xl font-semibold">Category  : <span class="font-normal">${data.meals[0].strCategory}</span></p>
                    <p class="py-2 text-4xl font-semibold">Recipes :</p>
                    <div class="p-4 flex flex-wrap gap-4">
                        ${recipyBox}
                    </div>
                    <p class="py-2 text-4xl font-semibold">Tags :</p>
                    <div class="py-4">
                        <a href='${data.meals[0].strSource}' target="_blank" class="text-gray-800 bg-green-600 px-4 py-2 rounded-lg mr-2">Source</a>
                        <a href='${data.meals[0].strYoutube}' target="_blank" class="text-gray-800 bg-red-600 px-4 py-2 rounded-lg">Youtube</a>
                    </div>
                </div>
            `)

    });
    });

    loader.addClass('hidden').removeClass('flex');
    document.body.classList.remove('overflow-hidden');
}


// ======================================================================================


const getMeals = async () => {
    loader.removeClass('hidden').addClass('flex');
    document.body.classList.add('overflow-hidden');
    const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s');

    meals.html(getMealCards(data));

    await getMealById();
    loader.addClass('hidden').removeClass('flex');
    document.body.classList.remove('overflow-hidden');
}


// ======================================================================================


getMeals(meals);


// ======================================================================================



const getSearchMealsByName = async ( name ) => {
     loader.removeClass('hidden').addClass('flex');
    document.body.classList.add('overflow-hidden');
    const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);

    searchMeals.html(getMealCards(data));

    await getMealById();
    loader.addClass('hidden').removeClass('flex');
    document.body.classList.remove('overflow-hidden');
}


// ======================================================================================



const getSearchMealsByLetter = async ( name ) => {
     loader.removeClass('hidden').addClass('flex');
    document.body.classList.add('overflow-hidden');
    const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`);

    searchMeals.html(getMealCards(data));

    await getMealById();
    loader.addClass('hidden').removeClass('flex');
    document.body.classList.remove('overflow-hidden');
}


// ======================================================================================


const getMealsByCategory = async ( category ) => {

}






openMenyBtn.on('click',()=>{
console.log("hello");
sideBar.removeClass('-left[250px]').addClass('left-0');



sideMenu.removeClass('translate-y-full opacity-0');
closeMenyBtn.removeClass('hidden');
openMenyBtn.addClass('hidden');
} )


// ======================================================================================


closeMenyBtn.on('click',()=>{
sideBar.removeClass('left-0');    
sideBar.addClass('-left[250px]');    
sideMenu.addClass('translate-y-full opacity-0');
closeMenyBtn.addClass('hidden');
openMenyBtn.removeClass('hidden');
} )


// ======================================================================================


searchBtn.on('click', async () => {
    mealDetails.addClass('hidden').removeClass('flex'); 

    $('.meal').addClass('hidden').removeClass('block');
    searchPage.removeClass('hidden').addClass('block');

    searchName.on("input", async (e) => {
        console.log(e.target.value);
        await getSearchMealsByName( e.target.value);
    })

    searchLetter.on("input", async (e) => {
        console.log(e.target.value);
        await getSearchMealsByLetter(e.target.value);
    })
})




