const API_KEY = "";
const submitIcon = document.querySelector("#submit-icon");
const inputElement = document.querySelector("input");
const imageSection = document.querySelector(".images-section");
const spinner = document.querySelector(".spinner");
const getImages = async (e) => {
    e.preventDefault();
    spinner.style.display = "block";
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: inputElement.value,
            n: 4,
            size: "1024x1024"
        })
    }
    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", options);
        const data = await response.json();
        console.log(data);
        imageSection.innerHTML = '';
        data?.data.forEach(imageObject => {
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");
            const imageElement = document.createElement("img");
            imageElement.setAttribute('src', imageObject.url);
            imageContainer.append(imageElement);
            imageSection.append(imageContainer);
        });
    }
    catch (error) {
        console.error("Error:", error);
    }
    finally {
        // Hide the spinner after data is loaded
        spinner.style.display = "none";
    }
}

submitIcon.addEventListener('click', getImages);