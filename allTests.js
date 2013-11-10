(function() {
    var idle = false;
    createCanvasOverlay(1);
    createCanvasOverlay(2);
    var fabricCanvas = new fabric.StaticCanvas('c1');
    var textArray = new Array();
    addCharsToCanvas(fabricCanvas);


    function setIdleFalse(){
        idle = false;
    }

    function idleAnimation(){
        for (var i = 0; i < textArray.length; i++) {
          var text = textArray[i];
          var dx = text.left;
          var dy = text.top;
          var vx = text.vx;
          var vy = text.vy;

          if (dx * dx + dy * dy <= 10000) {
            vx += dx * 0.01;
            vy += dy * 0.01;
          }
          vx *= 0.95;
          vy *= 0.95;

          vx += Math.random() - 0.5;
          vy += Math.random() - 0.5;

          var x = text.left += vx;
          var y = text.top += vy;

          if (x < 0 || x > maxx || y < 0 || y > maxy) {
            var r = Math.atan2(y - maxy / 2, x - maxx / 2);
            vx = -Math.cos(r);
            vy = -Math.sin(r);
          }

          text.vx = vx;
          text.vy = vy;
        }
    }

    function goToAnimation(TargetArray){
        for (var i = 0; i < textArray.length; i++) {
          var text = textArray[i];
          var dx = text.left;
          var dy = text.top;
          var vx = text.vx;
          var vy = text.vy;
          var tx = text.tx;
          var ty = text.ty;
          vx *= 0.95;
          vy *= 0.95;

          if((tx - dx) > 0){
          vx += 1;
          }
          else{
          vx -= 1;  
          }

          if((ty - dy) > 0){
            vy += 1;  
          }
          else{
            vy -= 1;
          }

          var x = text.left += vx;
          var y = text.top += vy;

          text.vx = vx;
          text.vy = vy;
        }
    }

    function animate() {   
        if(idle){   
          idleAnimation();
        }
        else{
          goToAnimation();
        }

        
        fabric.util.requestAnimFrame(animate, fabricCanvas.getElement());
        fabricCanvas.renderAll();   
    }

    function createTargetArray(){
      var targets = new Array();
      for(var i = 0; i < textArray.length; i ++){
        //set these values to your preference
        targets[i] = new Array();
        targets[i][0] = 0;
        targets[i][1] = 0;
      }

      return targets;
    }

    function setUpText(TargetArray){
      maxy = fabricCanvas.height;
      maxx = fabricCanvas.width;
      for (var i = 0; i < TargetArray.length; i++) {
        var text = textArray[i];
        text.vx = 0;
        text.vy = 0;
        text.ty = TargetArray[i][1];
        text.tx = TargetArray[i][0];
      }
      animate();
    }

    function initializeImage() {
        var raw_img = new Image();
        raw_img.crossOrigin = 'anonymous';
        raw_img.src = 'https://dl.dropboxusercontent.com/u/6258038/apple.jpg';
        raw_img.onload = function() {
            var canvas = document.getElementById('c2')
            var ctx = canvas.getContext('2d');
            ctx.drawImage(raw_img, 0, 0);
            var scaleFactor = ex.sum / calculateSize(this.width, this.height);
            pixels = scaleDisShit(raw_img, scaleFactor, this.width, this.height);
            var movements = window.greedyAlgorithm(ex.chars, pixels)
            //var targetArray = movements;
            var targetArray = [[200, 30],
                                [189, 26],
                                [176, 20],
                                [163, 15],
                                [150, 13],
                                [143, 12],
                                [135, 11],
                                [110, 11],
                                [101, 13],
                                [89, 18],
                                [70, 26],
                                [65, 28],
                                [54, 36],
                                [47, 44],
                                [34, 59],
                                [27, 77],
                                [17, 117],
                                [28, 149],
                                [28, 165],
                                [39, 169],
                                [48, 188],
                                [64, 205],
                                [89, 224],
                                [112, 227],
                                [125, 232],
                                [137, 231],
                                [156, 227],
                                [166, 226],
                                [179, 225],
                                [187, 223],
                                [205, 215],
                                [205, 195],
                                [205, 185],
                                [205, 175],
                                [205, 165],
                                [185, 165],
                                [161, 165],
                                [318, 82],
                                [300, 87],
                                [283, 96],
                                [267, 109],
                                [264, 130],
                                [263, 169],
                                [270, 180],
                                [280, 205],
                                [297, 213],
                                [322, 227],
                                [343, 222],
                                [371, 205],
                                [385, 187],
                                [385, 164],
                                [388, 136],
                                [386, 128],
                                [369, 106],
                                [359, 94],
                                [350, 87],
                                [495, 82],
                                [477, 87],
                                [460, 96],
                                [444, 109],
                                [441, 130],
                                [440, 169],
                                [477, 180],
                                [455, 205],
                                [474, 213],
                                [499, 227],
                                [520, 222],
                                [549, 205],
                                [562, 187],
                                [562, 164],
                                [565, 136],
                                [563, 128],
                                [546, 106],
                                [536, 94],
                                [527, 87],
                                [655, 85],
                                [643, 90],
                                [633, 94],
                                [619, 107],
                                [610, 137],
                                [617, 153],
                                [625, 165],
                                [642, 179],
                                [655, 186],
                                [678, 184],
                                [693, 176],
                                [700, 179],
                                [704, 158],
                                [712, 133],
                                [706, 122],
                                [698, 105],
                                [687, 100],
                                [684, 93],
                                [671, 90],
                                [672, 200],
                                [678, 215],
                                [704, 228],
                                [716, 244],
                                [716, 250],
                                [723, 268],
                                [720, 280],
                                [710, 298],
                                [704, 305],
                                [692, 313],
                                [682, 313],
                                [678, 315],
                                [670, 317],
                                [656, 314],
                                [648, 313],
                                [637, 312],
                                [626, 309],
                                [614, 305],
                                [598, 280],
                                [598, 273],
                                [601, 256],
                                [610, 246],
                                [627, 235],
                                [641, 227],
                                [650, 228],
                                [664, 228],
                                [780, 5],
                                [780, 15],
                                [780, 25],
                                [780, 35],
                                [780, 45],
                                [780, 55],
                                [780, 65],
                                [780, 75],
                                [780, 85],
                                [780, 95],
                                [780, 105],
                                [780, 115],
                                [780, 125],
                                [780, 135],
                                [780, 145],
                                [780, 155],
                                [780, 165],
                                [780, 175],
                                [780, 185],
                                [780, 195],
                                [780, 205],
                                [780, 215],
                                [780, 225],
                                [780, 235],
                                [865, 145],
                                [886, 139],
                                [903, 130],
                                [910, 128],
                                [923, 123],
                                [935, 115],
                                [927, 107],
                                [915, 91],
                                [908, 86],
                                [885, 82],
                                [870, 86],
                                [860, 94],
                                [848, 103],
                                [839, 118],
                                [837, 126],
                                [835, 144],
                                [836, 153],
                                [841, 161],
                                [846, 178],
                                [850, 183],
                                [855, 194],
                                [869, 206],
                                [877, 213],
                                [902, 220],
                                [910, 223],
                                [925, 220],
                                [928, 218],
                                [941, 210],
                                [947, 208]];
            for(var i = 0; i < targetArray.length; i++) {
              targetArray[i][0] -= canvas.width/2;
            }
            var l = targetArray.length;
            for(var j = 0; j < 5; j++) {
              for(var k = 0; k < l; k++) {
                targetArray.push([targetArray[k][0], targetArray[k][1]+1]);

              }
            }
            setUpText(targetArray);
            //@Faruh your array is called "movements" and it is directly above. Please only do shit with it in this function block since this has to all happen
            //after the image has loaded
        };
    }

    function addCharsToCanvas(canvas){
        var StartTime = new Date().getTime() /1000;
        ex = new Explosion()
        var sum = 0;
        for(var i = 0; i < ex.chars.length; i++) {
            var c = ex.chars[i];
            var x = c.offsetLeft;
            var y = c.offsetTop;
            var text = new fabric.Text(c.char, {
                left:x, 
                top:y,
                fontSize: c.fontsize,
                fontFamily: c.fontfamily,
                textDecoration: c.textdecoration,
                fontStyle: c.fontstyle,
                textAlign: c.textalign,
                stroke: c.stroke,
                strokeweight: c.strokeweight
            });
            sum += c.width*c.height;
            textArray[i] = text;
        }
        var group = new fabric.Group(textArray, {
        });
        canvas.add(group);
        ex.sum = sum;
        globalPixels = initializeImage();
    }

    function scaleDisShit(raw_img, scaleFactor, width, height) {
        var StartTime = new Date().getTime() / 1000;
        var canvas = document.getElementById('c2')
        var ctx = canvas.getContext('2d');
        var newWidth = Math.round(width*scaleFactor);
        var newHeight = Math.round(height*scaleFactor);
        if (newWidth - canvas.width > 0 || newHeight - canvas.height > 0)
        {
            ctx.drawImage(raw_img, 0, 0, canvas.width, canvas.height);
        }
        else
        {
            ctx.drawImage(raw_img, 0, 0, newWidth*scaleFactor, newHeight*scaleFactor);
        }
        var px = findFilledPixels(newWidth, newHeight);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return px;
    }


     function createCanvasOverlay(number)
     {
        var canvasContainer = document.createElement('div');
        document.body.appendChild(canvasContainer);
        canvasContainer.style.position="absolute";
        canvasContainer.style.left="0px";
        canvasContainer.style.top="0px";
        canvasContainer.style.width="100%";
        canvasContainer.style.height="100%";
        canvasContainer.style.zIndex="100" + number;
        canvasContainer.id = 'c' + number + '_container';

        myCanvas = document.createElement('canvas');
        myCanvas.style.width = canvasContainer.scrollWidth+"px";
        myCanvas.style.height = canvasContainer.scrollHeight+"px";
        myCanvas.width=canvasContainer.scrollWidth;
        myCanvas.height=canvasContainer.scrollHeight;
        myCanvas.style.overflow = 'visible';
        myCanvas.style.position = 'absolute';
        myCanvas.style.left="0px";
        myCanvas.style.top="0px";
        myCanvas.id = 'c' + number;
        myCanvas.style.zIndex = "100" + (3-number);
        document.body.removeChild(canvasContainer);
        document.body.appendChild(myCanvas);
     }

    function findFilledPixels(width, height) {
        var StartTime = new Date().getTime() / 1000;
        var pxl_map = new Array();
        var canvas = document.getElementById("c2")
        var outMax = width;
        var inMax = height;
        var count = 0;
        var num = 0;
        var yStart = 0;
        var ctx = canvas.getContext('2d');
        var data = ctx.getImageData(0, 0, width, height).data;
        for (var x = 0; x < outMax; x++) 
        {
            var inCount = 0;
            tmp = new Array();
            pxl_map[x] = tmp;
            for (var y = 0; y < inMax; y++) 
            {
                var currRed = parseInt(data[num]);
                var currGreen = parseInt(data[num+1]);
                var currBlue = parseInt(data[num+2]);
                var isFilled = currRed + currBlue + currGreen < (3*200);
                if(isFilled) {
                    pxl_map[x][y] = true;
                }
                else {

                    pxl_map[x][y] = false;
                }
                num += 4; 
            }
        }

        var FinishTime = new Date().getTime() / 1000;

        return pxl_map;
    }

    function calculateSize(width, height) {
        var StartTime = new Date().getTime() / 1000;
        var pxl_map = new Array();
        var outMax = width;
        var inMax = height;
        var count = 0;
        var num = 0;
        var yStart = 0;
        var canvas = document.getElementById('c2')
        var ctx = canvas.getContext('2d');
        var data = ctx.getImageData(0, 0, outMax, inMax).data;
        for (var x = 0; x < outMax; x++) //= x + 3)
        {
            var inCount = 0;
            for (var y = yStart; y < inMax; y++) //= y + 5)
            {
                tmp = new Array();
                var currRed = parseInt(data[num]);
                var currGreen = parseInt(data[num+1]);
                var currBlue = parseInt(data[num+2]);
                var isFilled = currRed + currBlue + currGreen < (3*200)
                if(isFilled)
                    count += 1;
                num += 4; 
            }
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var FinishTime = new Date().getTime() / 1000;

        return count;
    }
    }).call(this);
