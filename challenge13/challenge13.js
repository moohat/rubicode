const fs = require('fs');
var readlline = require('readline');
var path = require('path');
const FILE_NAME = process.argv[1];
const pathName = path.basename(FILE_NAME);

//constants
var TASK_JSON_PATH = "./tododb.json";

// var content = fs.readFileSync(FILE_NAME);
// var obj = JSON.parse(content);

var rl = readlline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function init() {

    console.log(`>>> JS TODO <<<`);
    console.log(`$ node  ${pathName} <command>`);
    console.log(`$ node  ${pathName} list`);
    console.log(`$ node  ${pathName} task <task_id>`);
    console.log(`$ node  ${pathName} add <task_content>`);
    console.log(`$ node  ${pathName} delete <task_id>`);
    console.log(`$ node  ${pathName} complete <task_id>`);
    console.log(`$ node  ${pathName} uncomplete <task_id>`);
    console.log(`$ node  ${pathName} list: outstanding asc| desc`);
    console.log(`$ node  ${pathName} list: completed asc| desc`);
    console.log(`$ node  ${pathName} tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>`);
    console.log(`$ node  ${pathName} filter:<tag_name>`);
    rl.close();
}

function getData() {
    //read file contents 
    var contents = fs.readFileSync(TASK_JSON_PATH);
    //parse contens
    var data = JSON.parse(contents);
    return data;
}

function setData(data) {
    //stringify JSON
    //untuk merapikan data menggunakan null, 3
    var dataString = JSON.stringify(data,null,2);
    //write to file
    fs.writeFileSync(TASK_JSON_PATH, dataString);
}

if (!fs.existsSync(TASK_JSON_PATH)) {

    setData([]);
}
//add task
function add(task) {
    //get data
    var data = getData();
    //add item
    if (task == null || task == "") {
        console.log('data harus diisi');
        rl.close();
    } else {
        data.push({ task: task, completed: false, tag: ([]) });
        //set data
        console.log(`"${task}" telah ditambahkan`);
        setData(data);

    }


}

//delete task
function remove(task) {
    //get data
    var data = getData();

    //delete item
    var del = data.splice(task, task + 1);

    //set new data
    setData(data)
    console.log(`"${del[0].task}" telah dihapus`);
}



//check task
function complete(task) {
    //get data
    var data = getData();

    //modify the data
    data[task].completed = true;

    //set data
    setData(data);
    console.log(`"${data[task].task}" telah selesai`);

    // //list
    // list();
}

//check task to uncomplete
function uncomplete(task) {
    //get data
    var data = getData();
    //modify the data 
    data[task].completed = false;
    //set data
    setData(data);
    console.log(`"${data[task].task}" status selesai dibatalkan`);

}

//list all tasks
function list() {
    //data
    var data = getData();
    if (data.length > 0) {
        //print the list
        console.log('Daftar Pekerjaan');
        data.forEach(function (task, index) {
            console.log(index + 1 + ".", " [" + (task.completed ? "x" : " ") + "] ", task.task);
        });
    } else {
        console.log('Tidak ada Pekerjaan');

    }
}

//check task to uncomplete
function uncomplete(task) {
    //get data
    var data = getData();
    //modify the data 
    data[task].completed = false;
    //set data
    setData(data);
    console.log(`"${data[task].task}" status selesai dibatalkan`);

}
//list all tasks
function task(task) {
    console.log(task);
    
        //data
    var data = getData();
    // console.log(data[task].task);
    
    if (data[task]) {
        //print the list
        
            console.log(task  +1+ ".", " [" + (data[task].completed ? "x" : " ") + "] ", data[task].task);
            
       
    } else {
        console.log('Tidak ada Pekerjaan');
        // console.log(data[task]);


    }
   1
}
/* 
//list all unclompleted tasks
function uncompleteList() {
    //data
    var data = getData();
    console.log('Daftar Pekerjaan');
    data.forEach(function (task, index) {
        if (task.completed == false) {

            console.log(index + 1 + ".", " [" + (task.completed ? "x" : " ") + "] ", task.task);
        }
    });

}

//list all completed tasks
function completedList() {
    //data
    var data = getData();
    console.log('Daftar Pekerjaan');
    data.forEach(function (task, index) {
        if (task.completed == true) {
            console.log(index + 1 + ".", " [" + (task.completed ? "x" : " ") + "] ", task.task);
        }
    });

}
 */
function completedAsc() {
    var data = getData();
    console.log('Daftar Pekerjaan');
    for (var i = 0; i < data.length; i++) {
        if (data[i].completed) {
            console.log(i + 1 + ".", " [" + (data[i].completed ? "x" : " ") + "] ", data[i].task);
        }
    }
}

function completedDesc() {
    var data = getData();
    console.log('Daftar Pekerjaan');
    for (var i = data.length - 1; i > -1; i--) {
        if (data[i].completed) {
            console.log(i + 1 + ".", " [" + (data[i].completed ? "x" : " ") + "] ", data[i].task);
        }
    }
}

function outstandingAsc() {
    var data = getData();
    console.log('Daftar Pekerjaan');
    for (var i = 0; i < data.length; i++) {
        if (!data[i].completed) {
            console.log(i + 1 + ".", " [" + (data[i].completed ? "x" : " ") + "] ", data[i].task);
        }
    }
}

function outstandingDesc() {
    var data = getData();
    console.log('Daftar Pekerjaan');
    for (var i = data.length - 1; i > -1; i--) {
        if (!data[i].completed) {
            console.log(i + 1 + ".", " [" + (data[i].completed ? "x" : " ") + "] ", data[i].task);
        }
    }
}

function tag (){
    var index = argument.slice(0,1)-1;
    // var index = task;
        // console.log(index);
        
        var toTag = argument.slice(2).split(' ');
        // console.log(toTag);
        
        var data = getData();
        var input = [];
        for (let i = 0; i < toTag.length; i++) {
            if (!data[index].tag.includes(toTag[i])) {
                //* input tag ke tododb.json
                data[index].tag.push(toTag[i]);
                // console.log(data[index]);
                //* push data tag ke array dan di tampilkan di command
                input.push(toTag[i]);
                // console.log(input);                
            }
        }
        setData(data);
        if(input.length ==0){
            console.log('tidak ada yang diinput');            
        } else{
            // console.log('sudah diinput');
            console.log(`'${input.join()}' telah ditambahkan ke dalam '${data[index].task}'.`);            
        }
}

function filterTask() {
    var tag = command.slice(7);
    console.log("Daftar Pekerjaan");
    var data = getData();
    for (let i = 0; i < data.length; i++) {
        if (data[i].tag.includes(tag)) {
            console.log(`${i + 1}. ${data[i].completed ? '[x]' : '[ ]'} ${data[i].task}`);
        }

    }
}


var command = process.argv[2];
var argument = process.argv.splice(3).join(' ');
// console.log(argument);


// init();
switch (command) {
    case undefined:
        init();
        break;
        case "task":
        task(argument-1);
        // console.log(argument-1);
        
        rl.close();
        break;
    case "add":
        add(argument);
        rl.close();
        break;
    case "delete":
        remove(argument - 1);
        rl.close();
        break;
    case "list":
        list();
        rl.close();
        break;
    case "list:outstanding":
        if (argument == 'asc') {
            outstandingAsc();
        } else if (argument == 'desc') {
            outstandingDesc();
        } else {
            console.log("Sertakan jenis pengurutannya dengan menuliskan (asc|desc)");
        }
        rl.close();
        break;

    case "list:completed":
        if (argument == 'asc') {
            completedAsc();
        } else if (argument == 'desc') {
            completedDesc();
        } else {
            console.log("Sertakan jenis pengurutannya dengan menuliskan (asc|desc)");
        }
        rl.close();
        break;
    case "complete":
        complete(argument - 1);
        rl.close();
        break;
    case "uncomplete":
        uncomplete(argument - 1);
        rl.close();
        break;
    case "tag":
        tag(argument-1);
        rl.close();
        break;
    case "help":
        init();
        rl.close();
        break;
    case `filter:${command.slice(7)}`:
        filterTask();
        rl.close();
        break;

    default:
        console.log("tidak ada perintah!!");
        rl.close();
        break;
}



