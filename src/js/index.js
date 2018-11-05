window.onload = function() {
    var input = document.querySelectorAll('label input');
    var button = document.querySelectorAll('label button');
    input.forEach(function(file) {
        file.onclick = function() {
            alert(3)
        }
    })
}