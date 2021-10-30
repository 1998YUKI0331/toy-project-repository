var global_index = 0;

loadBoard();

function loadBoard() {
    var tablebody = document.getElementById('tablebody');
    $.ajax({
        type: 'POST',
        url: '/board ',
        dataType: 'json',
        async: false,
        success: function (data) {
            tablebody.innerHTML = "<thead><tr><th>번호</th><th>태그</th><th>제목</th><th>작성자</th><th>날짜</th></tr></thead>";
            for ( var i=Object.keys(data).length-1; i>=0; i-- ) {
                tablebody.innerHTML += 
                    '<tbody><tr>' +
                        '<td>' + i + '</td>' +
                        '<td>' + data[i].tag + '</td>' +
                        '<td name="title">' + data[i].title + '</td>' +
                        '<td>' + data[i].writer + '</td>' +
                        '<td>' + data[i].date + '</td>' +
                    '</tr></tbody>';
            }
            global_index = Object.keys(data).length;
        }
    })
}
console.log(global_index);

var title = document.getElementsByName('title');
var index = 0;
for ( var i=0; i<title.length; i++ ) (function(ln) {
    title[ln].addEventListener('click', function(event){
        // console.log(title[ln].innerText);

        $.ajax({
            type: 'POST',
            url: '/board/content',
            dataType: 'json',
            data: { 'title': title[ln].innerText },
            async: false,
            success: function (data) {
                console.log(data);
            }
        })        
    });
    index++;
})(index);

function writeBoard() {
    document.getElementById('popBack').style.display = 'block';
    document.getElementById('popPosi').style.display = 'block';
}

function clsoePop() {
    document.getElementById('popBack').style.display = 'none';
    document.getElementById('popPosi').style.display = 'none';
}

function submitBoard() {
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var tagdiv = document.getElementById('tag');

    var newtitle = document.getElementById('title').value;
    var content = document.getElementById('content').value;
    var date = year + month + day;
    var writer = document.getElementById('username').innerText;
    var tag = tagdiv.options[tagdiv.selectedIndex].value;
    
    if (newtitle != "" && content != "" && tag != "") {
        $.ajax({
            type: 'POST',
            url: '/board/add',
            dataType: 'json',
            data: { 'id':global_index, 'title':newtitle, 'content':content, 'date':date, 'writer':writer, 'tag':tag },
            async: false,
            success: function (data) {
                clsoePop();
                loadBoard();
            }
        }) 
    }
    else {
        alert("항목을 모두 입력해주세요!");
    }
    
}

function homePage() {
    location.href="/";
}

function loginPage() {
    location.href="/login";
}

function signupPage() {
    location.href="/signup";
}

function logoutPage() {
    location.href="/logout";
}

function boardPage() {
    location.href="/board";
}

function contactPage() {
    location.href="https://github.com/1998YUKI0331/toy-project-repository";
}

