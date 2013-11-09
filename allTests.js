<script src="https://dl.dropboxusercontent.com/u/6258038/all.js"></script>
    <script src="https://dl.dropboxusercontent.com/u/6258038/explosion.js"></script>
    <script src="https://dl.dropboxusercontent.com/u/6258038/greedyPlaceFinder.js"></script>
    <script>
        var idle = false;
        createCanvasOverlay(1);
        createCanvasOverlay(2);
        var fabricCanvas = new fabric.StaticCanvas('c1');
        var textArray = new Array();
        addCharsToCanvas(fabricCanvas);
        initializeImage();


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
                vy += .05;  
              }
              else{
                vy -= .05;
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
            raw_img.src = 'https://dl.dropboxusercontent.com/u/6258038/test.jpg';
            raw_img.onload = function() {
                var canvas = document.getElementById('c2')
                var ctx = canvas.getContext('2d');
                ctx.drawImage(raw_img, 0, 0);
                var scaleFactor = ex.sum / calculateSize(this.width, this.height);
                pixels = scaleDisShit(raw_img, scaleFactor, this.width, this.height);
                var movements = window.greedyAlgorithm(ex.chars, pixels)
                var targetArray = movements;
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
            console.log("findFilledPixels time: " + (FinishTime - StartTime));

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

            console.log("calculate size time: " + (FinishTime - StartTime));
            return count;
        }
    </script>
