var colorGame = new ColorGame();

function ColorGame() {

    var numSquares = 4;
    var colors = [];
    var pickedColor;
    var pickedColorName;
    var pickedColorRgb;
    var clickedColorName;
    var colorsList = [
        {
            name: 'red',
            rgb: '230, 25, 75',
        }, {
            name: 'green',
            rgb: '60, 180, 75',
        }, {
            name: 'yellow',
            rgb: '255, 255, 25',
        }, {
            name: 'blue',
            rgb: '0, 130, 200',
        }, {
            name: 'orange',
            rgb: '245, 130, 48',
        }, {
            name: 'purple',
            rgb: '145, 30, 180',
        }, {
            name: 'brown',
            rgb: '170, 110, 40',
        }, {
            name: 'white',
            rgb: '255, 255, 255',
        }, {
            name: 'black',
            rgb: '0, 0, 0',
        }, {
            name: 'pink',
            rgb: '248, 63, 147',
        }, {
            name: 'gray',
            rgb: '128, 128, 128',
        },
    ]

    var pickedSquare = document.querySelector('.left .square');
    var pickedSquareSpan = document.querySelector('.left .square #picked-span');
    var squares = document.querySelectorAll('.right .square');
    var resetButton = document.querySelector('#reset');
    var modeButtons = document.querySelectorAll('.mode');

    // Modal
    var popup = document.querySelector('#popup');
    var popupBtn = document.querySelector('.popup-button');

    function setupModeButtons() {
        for (var i =0; i < modeButtons.length; i++) {
            modeButtons[i].addEventListener('click', function() {
                modeButtons[0].classList.remove('selected');
                modeButtons[1].classList.remove('selected');
                this.classList.add('selected');
                var selectedButton = document.querySelector('.mode.selected');
                reset();
            });
        }
    }

    function setupSquares() {
        for(var i = 0; i < squares.length; i++) {
            squares[i].addEventListener('click', function() {
                // grab color of clicked square
                var clickedColor = this.style.backgroundColor;
                clickedColorName = this.getAttribute('data');
                var selectedButton = document.querySelector('.mode.selected');
                if (selectedButton.textContent === 'Match by Color') {
                    this.innerHTML = '<audio id="' + clickedColorName + '" src="lib/sounds/sounds1/' + clickedColorName + '.mp3"></audio>'
                    play();
                } else {
                    this.innerHTML = '<audio id="' + clickedColorName + '" src="lib/sounds/sounds2/' + clickedColorName + '.mp3"></audio>'
                    play();
                }
                // compare color to picked color
                if (clickedColor === 'rgb(' + pickedColor.rgb + ')') {
                    changeColors(clickedColor);
                    popup.style.display = 'block';
                    popupBtn.textContent = 'Play Again?';
                } else {
                    // this.style.backgroundColor = '#ffffff';
                    // this.style.borderColor = '#ffffff';
                }
            });
        }
    }

    function reset() {
        colors = generateRandomColors(numSquares);
        pickedColor = pickColor();
        pickedColorName = pickedColor.name;
        pickedColorRgb = pickedColor.rgb;
        resetButton.textContent = 'New Colors';
        var selectedButton = document.querySelector('.mode.selected');
        if (selectedButton.textContent === 'Match by Color') {
            pickedSquare.style.backgroundColor = 'rgb(' + pickedColorRgb + ')';
            pickedSquareSpan.textContent = '';
        } else {
            pickedSquare.style.background = 'none';
            pickedSquareSpan.textContent = pickedColorName;
        }
        for (var i = 0; i < squares.length; i ++) {
            if (colors[i]) {
                squares[i].style.display = 'inline-block';
                squares[i].style.borderColor = '#232323';
                squares[i].style.backgroundColor = 'rgb(' + colors[i].rgb + ')';
                squares[i].setAttribute('data', colors[i].name);
            } else {
                squares[i].style.display = 'none';
            }
        }
    }

    popupBtn.addEventListener('click', function() {
        reset();
        popup.style.display = "none";
    })
    
    resetButton.addEventListener('click', function() {
        reset();
    });

    function play() {
        var audio = document.querySelector('#' + clickedColorName);
        audio.play();
    }
    
    function changeColors(color) {
        for (var i = 0; i < squares.length; i ++) {
            squares[i].style.backgroundColor = color;
            squares[i].style.border = '0.3em solid #232323';
        }
    }
    
    function pickColor() {
        var random = Math.floor(Math.random() * colors.length);
        return colors[random]
    }
    
    function generateRandomColors(num) {
        var arr = shuffle(colorsList).slice(-num);
        return arr;
    }
    
    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }

    function init() {
            setupModeButtons();
            setupSquares();
            reset();
        }

    init();
}