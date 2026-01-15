// This is the main website address where we get currency rates from
const Base_URL = "https://hexarate.paikama.co/api/rates";

// Get all dropdown boxes (From & To)
const dropdowns = document.querySelectorAll(".dropdown select");

// Get the convert button
const btn = document.querySelector("button");

// Get the "from" currency dropdown
const fromCurr = document.querySelector(".from select");

// Get the "to" currency dropdown
const toCurr = document.querySelector(".to select");

// This is where the final message will be shown
const msg = document.querySelector(".msg");


// LOOP through both dropdowns
for (let select of dropdowns) {

    // LOOP through all currency codes (USD, CAD, INR, etc.)
    for (let currCode in countryList) {

        // Create a new option (one item in dropdown)
        let newOption = document.createElement("option");

        // Show currency code to the user
        newOption.innerText = currCode;

        // Store currency code as value
        newOption.value = currCode;

        // Set default "FROM" currency as USD
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        }
        // Set default "TO" currency as CAD
        else if (select.name === "to" && currCode === "CAD") {
            newOption.selected = true;
        }

        // Add the option to the dropdown
        select.append(newOption);
    }

    // When user changes a dropdown value
    select.addEventListener("change", (e) => {

        // Update the country flag
        updateflag(e.target);

        
    });
}


// This function gets the exchange rate and calculates money
const updateExchangeRate = async () => {

    // Get the amount input box
    let amount = document.querySelector(".amount input");

    // Get the value entered by the user
    let amtVal = amount.value;

    // If input is empty or 0, set it to 1
    if (amtVal === "" || amtVal === "0") {
        amount.value = "1";
        amtVal = 1;
    }

    // Build the API link using selected currencies
    const URL = `${Base_URL}/${fromCurr.value}/${toCurr.value}/latest`;

    // Call the API and wait for the response
    let response = await fetch(URL);

    // Convert API response to JavaScript object
    let data = await response.json();

    // Get the exchange rate from the response
    let rate = data.data.mid;

    // Calculate final converted amount
    let finalAmount = amtVal * rate;

    // Show result on the screen
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
};


// This function changes the flag image when currency changes
const updateflag = (element) => {

    // Get selected currency code
    let currCode = element.value;

    // Get country code using currency code
    let countryCode = countryList[currCode];

    // Create flag image URL
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    // Find the image inside dropdown box
    let img = element.parentElement.querySelector("img");

    // Change the flag image
    img.src = newSrc;
};


// When user clicks the convert button
btn.addEventListener("click", (evt) => {

    // Stop page from reloading
    evt.preventDefault();

    // Update the exchange rate
    updateExchangeRate();
});


// When page loads for the first time
window.addEventListener("load", () => {

    // Show conversion immediately
    updateExchangeRate();
});
