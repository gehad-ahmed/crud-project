var bookmarkName = document.getElementById("bookmarkName");
var websiteUrl = document.getElementById("websiteUrl");
var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");
var table = document.querySelectorAll("th");
var msg = document.getElementById("msg");
var demo = document.getElementById("demo");

submitBtn.addEventListener("click", function () {
  addData();
});

updateBtn.addEventListener("click", function () {
  updatePress();
});

var arrData = [];
if (localStorage.getItem("data") == null) {
  arrData = [];
} else {
  arrData = JSON.parse(localStorage.getItem("data"));
  displayData();
}

function addData() {
  var data = {
    webName: bookmarkName.value,
    webLink: websiteUrl.value,
  };

  console.log(notRepeating());

  if (testReg() == true) {
    if (notRepeating() == true) {
      arrData.push(data);
    } else {
      msg.classList.replace("d-none", "d-block");
    }
  } else {
    demo.classList.replace("d-none", "d-block");
  }

  localStorage.setItem("data", JSON.stringify(arrData));

  displayData();
  clearData();
}

function closePopup() {
  demo.classList.replace("d-block", "d-none");
}

function testReg() {
  var regexName = /^[a-z]{3,}$/;
  var regexUrl =
    /^(http:\/\/|https:\/\/)www\.[a-z]{3,}(\.com\/|\.org\/|\.com|\.org)$/;
  var bookstatus;
  var urlstatus;
  if (bookmarkName.value != "") {
    if (regexName.test(bookmarkName.value) == true) {
      bookmarkName.classList.add("is-valid");
      bookmarkName.classList.remove("is-invalid");
      bookstatus = true;
    } else if (regexName.test(bookmarkName.value) == false) {
      bookmarkName.classList.add("is-invalid");
      bookmarkName.classList.remove("is-valid");
      bookstatus = false;
    }
  }
  if (websiteUrl.value != "") {
    if (regexUrl.test(websiteUrl.value) == true) {
      websiteUrl.classList.add("is-valid");
      websiteUrl.classList.remove("is-invalid");
      urlstatus = true;
    } else {
      websiteUrl.classList.add("is-invalid");
      websiteUrl.classList.remove("is-valid");
      urlstatus = false;
    }
  }
  if (bookstatus == true && urlstatus == true) {
    return true;
  } else {
    return false;
  }
}

function visit(index) {
  localStorage.getItem("data");
  window.open(arrData[index].webLink, "_blank ");

  console.log(arrData[index].webLink);
}

function clearData() {
  bookmarkName.value = null;
  websiteUrl.value = null;
}
function displayData() {
  var empty = `
    <thead>
    <tr >
        <th class="">Index</th>
        <th class="">Website Name</th>
        <th class="">Visit</th>
        <th class="">Delete</th>
        <th class="">Update</th>
    </tr>
</thead>
    `;

  for (var i = 0; i < arrData.length; i++) {
    empty += `
       
    
        <tr>
        
            <td>${i + 1}</td>
            <td>${arrData[i].webName}</td>
      <td>
      <button onclick="visit(${i})" class="text-white visit border-0 px-3 py-2 rounded-2"><i class="fa-solid fa-eye me-2"></i>visit</button>
      </td>
            <td>
               <button onclick="deleteData(${i})" class="text-white delete border-0 px-3 py-2 rounded-2"><i class="fa-solid fa-trash me-2"></i>Delete</button>
            
            </td>
            <td>
                <button onclick="update(${i})" class="bg-warning text-white delete border-0 px-3 py-2 rounded-2"><i class="fa-regular fa-pen-to-square me-2"></i>Update</button>
                  
           </td>

        </tr> 
       
        `;
  }

  document.getElementById("table").innerHTML = empty;
  localStorage.getItem("data");
}

function deleteData(index) {
  arrData.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(arrData));
  displayData();
}

function update(index) {
  bookmarkName.value = arrData[index].webName;

  websiteUrl.value = arrData[index].webLink;

  submitBtn.classList.replace("d-block", "d-none");
  updateBtn.classList.replace("d-none", "d-block");

  localStorage.setItem("newData", index);
}

function updatePress() {
  var newData = localStorage.getItem("newData");

  arrData[newData].webName = bookmarkName.value;
  arrData[newData].webLink = websiteUrl.value;
  localStorage.setItem("data", JSON.stringify(arrData));
  localStorage.removeItem("newData");
  submitBtn.classList.replace("d-none", "d-block");
  updateBtn.classList.replace("d-block", "d-none");
  displayData();
  clearData();
}

function notRepeating() {
  var x = JSON.parse(localStorage.getItem("data"));
  var status = true;
  if (x && x.length > 0) {
    for (var i = 0; i < x.length; i++) {
      if (bookmarkName.value == x[i].webName) {
        status = false;
      }
    }
  }
  return status;
}

function closerepeatedPopup() {
  msg.classList.replace("d-block", "d-none");
}
