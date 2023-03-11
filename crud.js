//Form validation function. Does not let data be partially submitted to the table. No empty fields and email must have an @. 
//Uses a fancy bootstrap alert if empty or an invalid email address
function validateForm() {
    var name = document.getElementById('name').value;
    var genre = document.getElementById('genre').value;
    var location = document.getElementById('location').value;
    var email = document.getElementById('email').value;

    if (name == '') {
        document.getElementById('alertName').classList.remove('hide');
        return false;
    }

    if (genre == '') {
        document.getElementById('alertGenre').classList.remove('hide');
        return false;
    }

    if(location == '') {
        document.getElementById('alertLocation').classList.remove('hide');
        return false;
    }

    if(email == '') {
        document.getElementById('alertEmail1').classList.remove('hide');
        return false;
    }
    else if(!email.includes('@')) {
        document.getElementById('alertEmail2').classList.remove('hide');
        return false;
    }

    return true;
}

//function to display the table each time data gets changed later on
function showData() {
    var bandList;
    if(localStorage.getItem("bandList") == null) {
        bandList = [];
    }
    else {
        bandList = JSON.parse(localStorage.getItem('bandList'));
    }
    //html variable to manipulate the DOM
    var html = '';
    //creates a table row with its own data as well as its own edit and delete buttons
    bandList.forEach(function (element, index) {
        html += '<tr>';
        html += '<td>' + element.name + '</td>';
        html += '<td>' + element.genre + '</td>';
        html += '<td>' + element.location + '</td>';
        html += '<td>' + element.email + '</td>';
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button> <button onclick="updateData(' + index + ')" class="btn btn-primary">Edit</button></td>';
        html += '</tr>';
    });

    document.querySelector('#crudTable tbody').innerHTML = html;
}

//loads data from local storage when page is opened 
document.onload = showData();

//function to add data to the table and storage array. Only works if the form validation earlier worked
function addData() {
    if(validateForm() == true) {
        var name = document.getElementById("name").value;
        var genre = document.getElementById("genre").value;
        var location = document.getElementById("location").value;
        var email = document.getElementById("email").value;
        var bandList;
        if(localStorage.getItem("bandList") == null) {
            bandList = [];
        }
        else {
            bandList = JSON.parse(localStorage.getItem('bandList'));
        } 

        bandList.push({
            name: name,
            genre: genre,
            location: location,
            email: email
        });

        localStorage.setItem('bandList', JSON.stringify(bandList));
        showData();
        document.getElementById('name').value = '';
        document.getElementById('genre').value = '';
        document.getElementById('location').value = '';
        document.getElementById('email').value = '';
    }
}

//Function to delete data. Removes from the table and the storage array (bandList)
function deleteData(index) {
    var bandList;
        if(localStorage.getItem("bandList") == null) {
            bandList = [];
        }
        else {
            bandList = JSON.parse(localStorage.getItem('bandList'));
        } 

        //splice to remove it from the array at its own index. Each one has its own button. showData again after to update the table
        bandList.splice(index, 1);
        localStorage.setItem('bandList', JSON.stringify(bandList));
        showData();
}

//function for the edit buttons on each data entry. Style.display lines here hide the add band button and reveal the update button when you click edit.
function updateData(index) {
    document.getElementById("submit").style.display = 'none';
    document.getElementById("update").style.display = 'block';

    var bandList;
    if(localStorage.getItem("bandList") == null) {
        bandList = [];
    }
    else {
        bandList = JSON.parse(localStorage.getItem('bandList'));
    }

    //puts the existing values back into the form above so you can edit any of them
    document.getElementById("name").value = bandList[index].name;
    document.getElementById("genre").value = bandList[index].genre;
    document.getElementById("location").value = bandList[index].location;
    document.getElementById("email").value = bandList[index].email;
    //this is tied to the update button that replaces the add band button. Wether you change the values or not, it puts what is in the form as the new data
    document.querySelector("#update").onclick = function() {
        if(validateForm() == true) {
            bandList[index].name = document.getElementById('name').value;
            bandList[index].genre = document.getElementById('genre').value;
            bandList[index].location = document.getElementById('location').value;
            bandList[index].email = document.getElementById('email').value;

            localStorage.setItem('bandList', JSON.stringify(bandList));

            showData();

            document.getElementById('name').value = '';
            document.getElementById('genre').value = '';
            document.getElementById('location').value = '';
            document.getElementById('email').value = '';

            //changes the buttons back to default, update hidden and add band revealed
            document.getElementById("submit").style.display = 'block';
            document.getElementById("update").style.display = 'none';
        }
    }
}