
// Fetch Dog breeds from Dogs API
const fetchData = async () =>{
    try {
        // fetching data from API
    const response = await fetch (`https://dog.ceo/api/breeds/list/all`)
   
    // throw an error if ftech fails with response object status is not ok
    if (!response.ok) throw (error);

    // parsing response to json object
    const data = await response.json();

    return data.message
}

    // catch and log error to console

    catch (error) { console.log (error)}

}


//  Fetch Dog images from Images API
const fetchSecondData = async (nameOfBreed,num) => {
    // params: nameOfBreed :str 
    // params: num : int
    try {
        // fetching data from API
       
        const url = `https://dog.ceo/api/breed/${nameOfBreed}/images/random/${num}`;
        const response = await fetch(url);

        // throw an error if fetch fails with response object status is not ok
        if (!response.ok) throw (error);

        // parsing response to JSON object
        const data = await response.json();

        return data.message;
    } catch (error) {
        console.log(error);
    }
};


// Render page contents

document.addEventListener('DOMContentLoaded', async function () {
    // async function to load Dog breeds list 
    const loadDogsList = async (e) => {
        try {
            //  prevent default form submission to avoid page refresh
            e.preventDefault();

            // Make a fetch API call to load Dog List
            const dataLoad = await fetchData();

            // Access the select element by its ID
            const dogsSelect = document.getElementById('dogs');

            // Clear existing options
            dogsSelect.innerHTML = '';

            // loop through data object and append values as select options

            for (const [key, value] of Object.entries(dataLoad)) {
                const option = document.createElement('option');
                option.innerText = key;
                dogsSelect.appendChild(option);
                
        }


        } 
        // catch and log errors
        catch (error) {
            console.error(error);
        }
    };

    // Loading dog breeds onclick of Load Dogs button to enable select input 
    const loadButton = document.getElementById('buttons');
    loadButton.addEventListener('click',loadDogsList);


    // Add an on change event listener to the select dropdown
    const dogsSelect = document.getElementById('dogs');
    dogsSelect.addEventListener('change', async function (e) {
        // Get the selected value from the dropdown
        const selectedValue = e.target.value;

        // Get the selected number from the input
        const selectedNumber = parseInt(document.getElementById('numberInput').value);


        // return array of images for selected breed and count
        const loadImages = await fetchSecondData(selectedValue,selectedNumber)

        var selectIds = document.getElementById('con2')
        // selectIds.style.border = "1px solid #fff"
        // selectIds.style.borderRadius = "10%"; 
        selectIds.innerHTML = '';
        const imageTag = document.createElement('img');
        // Map image array and create figures and append images
        loadImages.map((item)=> {
            // for each mapping create a div inside the main div with ID=con2
        //    const wrapperDiv = document.createElement('div');
        //    wrapperDiv.class= "row";
        // Split the URL by '/'
            const urlParts = item.split('/');

            // Get the breed name from the array
            const breedName = urlParts[4];


           const figureTag = document.createElement('figure');
           figureTag.className="figure col ms-1 w-25 h-25";
           const figCap = document.createElement('figcaption');
           figCap.className="figure-caption text-lg text-white";
           figCap.innerText= `${breedName}`;

            const imageTag=  document.createElement('img');
            imageTag.src = item
          

            imageTag.className = "figure-img rounded img-thumbnail w-100 h-50"

            // display a placeholder icon if image loading fails ie for images with 404 error
            imageTag.addEventListener('error', (e) => {
                console.log(`Failed to load image: ${item}`);
                // imageTag.style.display = 'none';
                imageTag.src = 'icons/dog-svgrepo-com.svg';
                imageTag.alt = 'Failed to Load Image';
                figCap.innerText= `Server Error: Failed to Load Image`;
                figCap.className="text-xl bg-red"
            });

            // imageTag.innerText = Images[i];
            // wrapperDiv.appendChild(figureTag)
            figureTag.appendChild(imageTag)
            figureTag.appendChild(figCap)
            selectIds.appendChild(figureTag)
        })

        // Call your function with the selected values
    });

    // Applying styling to body background
    const bodyTag= document.getElementById("bodyTag");
    bodyTag.className= "bg-black bg-gradient text-white p-2 text-white vh-100"

    // Ceating header elements
    const headId = document.getElementById("headerId");
    headId.style.border = "1px solid #fff"
    // first Div content for header dog icon
    const firstDiv = document.createElement('div');
    firstDiv.className="d-flex flex-row align-items-center"
    const imgId = document.createElement('img');
    imgId.src= "icons/dog-face-svgrepo-com.svg";
    imgId.alt = "Dog Face";
    imgId.style.height = "50px"
    firstDiv.appendChild(imgId)
    // second div headers element for Header description
    const secondDiv = document.createElement('div');
    secondDiv.className="align-items-center"
    const pageDesc = document.createElement('h1')
    // const pageDesc2 = document.createElement('p')
    pageDesc.innerText="WELCOME TO DOG MEGADON "
    // pageDesc2.innerHTML='<p>VISIT OUR DOG GALLERY</p>'
    secondDiv.appendChild(pageDesc)
    // secondDiv.appendChild(pageDesc2)

    // third div content icons
    const thirdDiv = document.createElement('div');
    thirdDiv.className="d-flex flex-row align-items-center"

    // header home icon
    const homeIcon = document.createElement('img');
    homeIcon.src="icons/home-page-svgrepo-com.svg";
    homeIcon.alt = "home Icon";
    homeIcon.style.height = "50px";
    homeIcon.style.width = "50px";
    homeIcon.style.margin = "10px";
    // homeIcon.style.padding = "5px";

    // header contact icon
    const contactIcon = document.createElement('img');
    contactIcon.src= "icons/contact-24hr-svgrepo-com.svg";
    contactIcon.alt = "contact Icon";
    contactIcon.style.height = "50px";
    contactIcon.style.width = "50px";
    contactIcon.style.margin = "10px";
    // header profile icon
    const profileIcon = document.createElement('img');
    profileIcon.src= "icons/profile-user-svgrepo-com (1).svg";
    profileIcon.alt = "profile Icon";
    profileIcon.style.height = "50px";
    profileIcon.style.width = "50px";
    profileIcon.style.margin = "10px";
    // append icons to header child
    thirdDiv.appendChild(homeIcon);
    thirdDiv.appendChild(contactIcon);
    thirdDiv.appendChild(profileIcon);
    // append all header child elements
    headId.appendChild(firstDiv);
    headId.appendChild(secondDiv);
    headId.appendChild(thirdDiv);

    // footer style and elements
    const footerI = document.getElementById('footerId');
    footerI.style.border = "1px solid #fff"
    const contactDiv = document.getElementById('contact');
    const partnersDiv = document.getElementById('partners');

    // Add content to the footer contact div using innerHTML
    contactDiv.innerHTML = '<h4>Follow us on Social Media</h4>' +
                           '<div class="d-flex flex-row text-center justify-content-center">' +
                                '<img class="m-3 rounded" src="icons/facebook-icon-logo-svgrepo-com.svg"  width="50" height="50" alt="Facebook"></img>' +
                                '<img class="m-3 rounded" src="icons/twitter-logo-svgrepo-com.svg"  width="50" height="50" alt="Twitter"></img>' +
                                '<img class="m-3 rounded" src="icons/instagram-2-1-logo-svgrepo-com.svg" width="50" height="50" alt="Instagram"></img>'     
                            '</div>';
    // Add content to the footer partners div using innerHTML
    partnersDiv.innerHTML = '<h4>Partners</h4>'+
                            '<ul class="list-group text-white">'+
                                '<li class="list-group-item" aria-current="false">DogCademy</li>'+
                                '<li class="list-group-item text-white bg-black">ScoobyShoppers</li>'+
                                '<li class="list-group-item text-white bg-black">DuffyShppers</li>'+
                               ' <li class="list-group-item text-white bg-black">Empire Ruby"s</li>'+
                            '</ul>';
});



