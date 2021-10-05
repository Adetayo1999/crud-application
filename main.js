const myForm = getValue("myform");
const submitBtn = getValue("addbtn");
const editBtn = getValue("handleedit");

// Event Listeners
myForm.addEventListener("submit", (e) => e.preventDefault());
submitBtn.addEventListener("click", handleSubmit);
editBtn.addEventListener("click", handleUpdate);

document.addEventListener("DOMContentLoaded", () => {
  setUserId();
  displayUsers();
});


// Creating The User
function handleSubmit() {
  const { userId, firstName, lastName, profession, phoneNumber } = formData();

  if (userId && firstName && lastName && phoneNumber && profession) {
    const DB = localDB();
    const userData = {
      userId,
      firstName,
      lastName,
      phoneNumber,
      profession,
    };

    DB.push(userData);
    setLocalDB(DB);

    window.location.reload();
  } else {
    alert("Inputs Must Be Filled");
  }
}


// Reading The User From The Local Storage
function displayUsers() {
  const DB = localDB();
  const tableBody = getValue("tablebody");

  DB.map((user , index) => {
    const tableRow = document.createElement("tr");

    tableRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.phoneNumber}</td>
            <td>${user.profession}</td>
            <td>
                <button class="deletebtn" onclick="deleteUser(${user.userId})"> <i class="fa fa-trash"></i></button>
                <button class="editbtn" onclick="populateForm(${user.userId})"> <i class="fa fa-edit"></i></button>
            </td>
            `;

    tableBody.append(tableRow);
  });
}




// Populating The Form With The User Data To Update
function populateForm(id) {
  const DB = localDB();
  const { userId, firstName, lastName, profession, phoneNumber } = DB.find(
    (user) => user.userId == id
  );

  getValue("userid").value = userId;
  getValue("firstname").value = firstName;
  getValue("lastname").value = lastName;
  getValue("pnumber").value = phoneNumber;
  getValue("profession").value = profession;
  getValue("handleedit").style.visibility = "visible";
}


// Updating The Edited User In The LocalStorage
function handleUpdate() {
  const { userId, firstName, lastName, profession, phoneNumber } = formData();

  if (firstName && lastName && phoneNumber && profession) {
    const DB = localDB();

    const clickedUser = DB.find((user) => user.userId === userId);

    clickedUser.firstName = firstName;
    clickedUser.lastName = lastName;
    clickedUser.profession = profession;
    clickedUser.phoneNumber = phoneNumber;

    setLocalDB(DB);

    window.location.reload();
  } else {
    alert("Inputs Must Be Filled");
  }
}


// Deleting A User
function deleteUser(id) {
  const confirmation = confirm("Are You Sure ?");

  if (confirmation) {
    const DB = localDB();
    console.log(id);
    const filteredDB = DB.filter((user) => user.userId != id);
    setLocalDB(filteredDB);
    window.location.reload();
  }
}



// Reusable Functions

function localDB() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
  }

  return JSON.parse(localStorage.getItem("users"));
}



function setLocalDB(data) {
  return localStorage.setItem("users", JSON.stringify(data));
}

 function getValue(value) {
  return document.getElementById(value);
}

 function formData() {
  return {
    userId: getValue("userid").value,
    firstName: getValue("firstname").value,
    lastName: getValue("lastname").value,
    phoneNumber: getValue("pnumber").value,
    profession: getValue("profession").value,
  };
}

function setUserId() {
  const DB = localDB().length;
  getValue("userid").value = DB + 1;
}
