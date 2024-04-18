async function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
        name: event.target.name.value,
        mobile: event.target.mobile.value,
        address: event.target.address.value
    };

    try {
        const result = await axios.post("https://crudcrud.com/api/69bffbee2af54055a23cf6d1acc1170c/studentData", userDetails);
        displayUserOnScreen(result.data);
        await updateTotalStudents();
    } catch (err) {
        console.log(err);
    }

    // Clearing input fields
    document.getElementById("name").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("address").value = "";
}

async function updateTotalStudents() {
    try {
        const res = await axios.get("https://crudcrud.com/api/69bffbee2af54055a23cf6d1acc1170c/studentData");
        const totalStudents = res.data.length;
        const heading = document.querySelector("h5.text-center");
        heading.textContent = `All Students: ${totalStudents}`;
    } catch (err) {
        console.log(err);
    }
}

async function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.setAttribute("data-user-id", userDetails._id);
    userItem.appendChild(
        document.createTextNode(
            `${userDetails.name} - ${userDetails.mobile} - ${userDetails.address}`
        )
    );

    const delBtn = document.createElement("button");
    delBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(delBtn);

    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);

    const userList = document.getElementById("user-list");
    userList.appendChild(userItem);

    delBtn.addEventListener("click", async function (event) {
        const userId = event.target.parentElement.getAttribute("data-user-id");
        try {
            await axios.delete(`https://crudcrud.com/api/69bffbee2af54055a23cf6d1acc1170c/studentData/${userId}`);
            userList.removeChild(event.target.parentElement);
            console.log("successfully deleted");
        } catch (err) {
            console.log(err);
        }
    });

    editBtn.addEventListener("click", async function (event) {
        const userId = event.target.parentElement.getAttribute("data-user-id");
        try {
            const res = await axios.get(`https://crudcrud.com/api/69bffbee2af54055a23cf6d1acc1170c/studentData/${userId}`);
            document.getElementById("name").value = res.data.name;
            document.getElementById("mobile").value = res.data.mobile;
            document.getElementById("address").value = res.data.address;
        } catch (err) {
            console.log(err);
        }
    });
}

async function displayUserDataOnLoad() {
    try {
        const res = await axios.get("https://crudcrud.com/api/69bffbee2af54055a23cf6d1acc1170c/studentData");
        const userList = document.getElementById("user-list");
        userList.innerHTML = ""; // Clear previous data
        res.data.forEach((userDetails) => {
            displayUserOnScreen(userDetails);
        });
        // Update total number of students in the heading
        const totalStudents = res.data.length;
        const heading = document.querySelector("h5.text-center");
        heading.textContent = `All Students: ${totalStudents}`;
    } catch (err) {
        console.log(err);
    }
}

// Add event listener to the form
// document.getElementById("student-list").addEventListener("submit", handleFormSubmit);

window.onload = displayUserDataOnLoad;
