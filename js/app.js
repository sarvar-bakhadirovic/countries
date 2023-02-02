const API = 'https://restcountries.com/v3.1/name/'
const REGION_API = 'https://restcountries.com/v3.1/region/'
const form = document.querySelector('#form')
const list = document.querySelector('.countries__list')
const main = document.querySelector('.main')
const info = document.querySelector('.info')
const backBtn = document.querySelector('.info__back')
const regions = document.querySelector('#regions')
const darkMode = document.querySelector('#dark_mode')

const getValue = async (api, value) => {
    if (value) {
        loading(true)
        const response = await fetch(`${api}${value}`)
        const data = await response.json()
        loading(false)
        return data
    } else {
        alert('Davlat nomini kiriting!')
    }
}

form.addEventListener('submit', e => {
    e.preventDefault()
    list.innerHTML = ''

    let {
        input
    } = e.target.elements




    getValue(API, `${input.value.trim()}`)
        .then(result => {
            render(result)
        })
        .catch(err => {
            alert("Bunday davlat topilmadi")
            console.log(err.message);
        })

    e.target.reset()
});

regions.addEventListener('change', e => {
    e.preventDefault()
    list.innerHTML = ''

    let item = e.target.value

    if (item != 'default') {
        getValue(REGION_API, item)
            .then(result => {
                render(result)
            })
    }
})

function render(response) {
    response.forEach(element => {
        // create elements
        // li
        const li = document.createElement('li')
        li.classList.add("country")

        // flag
        const flag = document.createElement('img')
        flag.classList.add('country__flag')
        flag.src = element.flags.svg
        // flag.style.cssText = `background-image: url(${element.flags.svg});`
        li.append(flag)

        //div
        const div = document.createElement('div')
        div.classList.add("country__info")

        // h1
        const h1 = document.createElement('h1')
        h1.classList.add('country__name')
        h1.textContent = element.name.common
        div.append(h1)

        //ul
        const ul = document.createElement('ul')
        ul.classList.add('country__infoList')

        //population
        const population = document.createElement('li')
        population.classList.add('country__population')
        population.innerHTML = ` 
            <h2 class="country__population-text">Population: </h2>
            <span class="country__population-value" id="populationNumber">${element.population}</span> 
        `

        //region
        const region = document.createElement('li')
        region.classList.add('country__region')
        region.innerHTML = `
            <h2 class="country__region-text">Region: </h2>
            <span class="country__region-value" id="regionValue">${element.region}</span>
        `

        // //capital
        const capital = document.createElement('li')
        capital.classList.add('country__capital')
        capital.innerHTML = `
            <h2 class="country__capital-text">Capital: </h2>
            <span class="country__capital-value" id="capitalValue">${element.capital ? element.capital[0] : 'none'}</span>
        `

        ul.append(population, region, capital)
        div.append(ul)
        li.append(div)
        list.append(li)

        infoFunc(h1, element)

    });
}

function loading(state) {
    const __loading = document.getElementById('loading')
    if (state) {
        __loading.style.display = 'flex'
    } else {
        __loading.style.display = 'none'
    }
}

function infoFunc(element, api) {
    element.addEventListener('click', e => {
        e.preventDefault()

        main.style.display = "none"
        info.style.display = "flex"

        const info_flag = document.querySelector('.info__flag')
        const info_name = document.querySelector('.info__name')
        const native_name = document.querySelector('#official_name')
        const population = document.querySelector('#population')
        const region = document.querySelector('#region')
        const sub_region = document.querySelector('#sub_region')
        const capital = document.querySelector('#capital')
        const domain = document.querySelector('#domain')
        const currencies = document.querySelector('#currencies')


        info_flag.src = api.flags.svg
        info_flag.alt = api.flags.alt
        info_name.textContent = api.name.common
        native_name.textContent = api.name.official
        population.textContent = api.population
        region.textContent = api.region
        sub_region.textContent = api.subregion
        capital.textContent = api.capital
        domain.textContent = api.tld[0]
        currencies.textContent = api.currencies[Object.keys(api.currencies)[0]].name
        for (let lan in api.languages) {
            const language = document.querySelector('#language')
            language.append(`${api.languages[lan]}, `)
            console.log(api.languages[lan]);
        }
    })
}

backBtn.addEventListener('click', e => {
    e.preventDefault()

    main.style.display = "flex"
    info.style.display = "none"
})