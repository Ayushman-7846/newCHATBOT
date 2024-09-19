let input = document.querySelector(".input");
let chat_box = document.querySelector(".chat-box");
let middle = document.querySelector(".middle");
let no_of_people=1;

input.addEventListener("click",()=>{
    input.value=" ";
})

const place_price={
    nandankanan: 100,
    konark: 50,
    jagnnath_temple: 0,
    khnadagiri: 25,
    dhouli: 30,
    lingaraj_temple: 10,
    rajarani_temple: 5,
    iit_ghatikia: -10,
    iskon: 0,
    samaleswari_temple: 20
};



const createChat=(message , className)=>{
    let list = document.createElement("li");
    let para = document.createElement("p");
    para.innerText=message;
    list.classList.add("chats",className);
    list.append(para);
    return list;
}

//info - name and phone no
let form=document.createElement("div");
form.innerHTML=
        `<label style="display: block; margin-bottom: 10px; color: #333;">Name:</label>
        <input type="text" id="name"  placeholder="Enter your name" 
        style="width: 100%; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px;">

        <label style="display: block; margin-bottom: 10px; color: #333;">Phone Number:</label>
        <input id="phone" type="number" placeholder="Enter your phone number" 
        style="width: 100%; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px;">

        <button id="submit" value="Submit" 
        style="width: 30%; padding: 10px; background-color: #28a745; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Submit</button>`;

chat_box.append(form);




//info - number of members in group

let tdiv=document.createElement("div");
tdiv.innerHTML=
        `<label  style="display: block; margin-bottom: 10px; color: #333;">Name:</label>
        <input type="number" id="group"  placeholder="no of people" 
        style="width: 100%; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px;">
        <button id="submit1" value="Submit" 
        style="width: 30%; padding: 10px; background-color: #28a745; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Submit</button>`;
        
        
//info - places dropdown
        
let sele = document.createElement("select");

// Add CSS styles using setAttribute
sele.setAttribute('style', 'width: 200px; padding: 10px; margin: 20px 0; border: 1px solid #ccc; border-radius: 4px;');

// Variable to hold the selected place
let selectedPlace = "";

// Add options to the select element
for (let place in place_price) {
    // Create an option element
    let newOption = document.createElement("option");
    
    // Set the text and value of the option
    newOption.innerText = place;
    newOption.value = place;

    // Append the option to the select element
    sele.append(newOption);
}

// Add an event listener to update the selected place variable
sele.addEventListener('change', function() {
    selectedPlace = sele.value;
    console.log('Selected place:', selectedPlace);

    chat_box.append(createChat(`for ${no_of_people} members in your group you need to pay RS: ${no_of_people*place_price[selectedPlace]}/-`,"by_bot"))

    let img=document.createElement("div");
    img.innerHTML=`<img src="qr.jpg" style="width: 100%; height: auto; max-width: 200px;">`;
    chat_box.append(img);

});




//info - heart

document.querySelector("#submit").addEventListener("click", ()=>{
    
    let name= document.querySelector("#name").value;
    let ph_no= document.querySelector("#phone").value;

    
    chat_box.append(createChat("Enter how many peoples are in your group","by_bot"));
    chat_box.append(tdiv);

        document.querySelector("#submit1").addEventListener("click", ()=>{
             no_of_people= document.querySelector("#group").value;

            console.log(name , ph_no , no_of_people);
            
            chat_box.append(createChat("enter every ones name","by_bot"));
            generateInputFields(no_of_people);

                    document.querySelector("#submit2").addEventListener("click", async()=>{
                        saveNames(no_of_people);

                        chat_box.append(createChat("select where you want to visit","by_bot"));
                        chat_box.append(sele);

                   
                    });

        });

});


function generateInputFields(people) {
    // Get the number of people (n) from the input field
    const numPeople = people;

    // Validate the number
    if (numPeople < 1 || isNaN(numPeople)) {
        alert('Please enter a valid number of people.');
        return;
    }

    // Loop to create 'n' input fields
    for (let i = 1; i <= numPeople; i++) {
        // Create a label for the input field
        const label = document.createElement('label');
        label.textContent = `Person ${i} Name:`;
        label.style.display = 'block';
        label.style.marginTop = '10px';
        
        // Create an input field for the person's name
        const input = document.createElement('input');
        input.type = 'text';
        input.name = `person${i}`;
        input.id = `person${i}`;
        input.placeholder = `Enter name of person ${i}`;
        input.style.width = '100%';
        input.style.padding = '10px';
        input.style.marginBottom = '10px';
        input.style.border = '1px solid #ccc';
        input.style.borderRadius = '4px';
        
        // Append the label and input to the container
        chat_box.appendChild(label);
        chat_box.appendChild(input);
    }

    //info - save names
    let ppl= document.createElement("div");
    ppl.innerHTML=`<button id="submit2" value="Submit" 
    style="width: 30%; padding: 10px; background-color: #28a745; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Submit</button>`;
    chat_box.append(ppl);
    
}

function saveNames(no_of_people) {
    // Get the number of people (n) from the input field
    const numPeople = no_of_people;
    const namesArray = [];

    // Loop to get the value from each input field
    for (let i = 1; i <= numPeople; i++) {
        const nameValue = document.getElementById(`person${i}`).value;
        
        // Add the value to the array
        if (nameValue) {
            namesArray.push(nameValue);
        }
    }

    // Log the array in the console for testing purposes
    console.log('Names Array:', namesArray);
}