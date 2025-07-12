// const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
// const newYorkTime = new Date().toLocaleTimeString('en-US', options);

// console.log("Current time in New York:", newYorkTime);

const API_URL = "travel_recommendation_api.json";

const searchButton = document.querySelector("#search-button");
const recommendations = document.querySelector("#recommendations");
const rcm_list = document.querySelector("#recommendations_list");

const getTravelRecommends = async () => {
    const response = await fetch(API_URL);

    return await response.json();
}

const getQueryValue = () => {
    const inputElement = document.querySelector("#search");

    if (inputElement) {
        return inputElement.value;
    }
}

const printRes = () => {
    getTravelRecommends().then(value => {
        const rcm_key = Object.keys(value).filter((item) => item.includes(getQueryValue()));
        const curr = value[rcm_key];

        if (rcm_key[0] === "countries") {
            curr?.forEach(element => {
                element.cities?.forEach(sub => {
                    console.log(sub);
                    rcm_list.insertAdjacentHTML("afterbegin", `
                        <li>
                            <h2>${sub.name}</h2>
                            <p>${sub.description}</p>
                            <img src="${sub.imageUrl}" style="width: 500px; height 250px; object-fit: cover">
                        </li>
                    `)
                })
            });
        }

        else if (rcm_key.length && rcm_key !== "countries") {
            rcm_list.innerHTML = "";
            curr?.forEach(element => {
                rcm_list.insertAdjacentHTML("afterbegin", `
                    <li>
                        <h2>${element.name}</h2>
                        <p>${element.description}</p>
                        <img src="${element.imageUrl}" style="width: 500px; height 250px; object-fit: cover">
                    </li>
                `)
            });
        }
    })
}


if (searchButton) {
    searchButton.addEventListener("click", event => {
        event.preventDefault();

        printRes();
    })
}

getQueryValue();