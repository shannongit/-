function panorama() {
    init();
    animate();
}

var linename = {};
var isShow = false;      //当前是否处于全景图界面
var isPromp = false;     //当前是否有弹出框
var mouseDownTime = '';  //记录鼠标按下和抬起的时间，用于判断拖动还是单机
var mouseUpTime = '';
var date1 = new Date()
var camera, scene, renderer, mesh, mouse;
var sphere = [];
var buttons = [];  //所有热点按钮
var data = {};   //存放上传到服务器的数据
var isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 0, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0;
var towername, index = 0, materialTexture;
var TextureLoader = new THREE.TextureLoader();
var spriteMap, spriteMaterial;
var posionX, posionY, posionZ;



function panoramaSetPrompFlag(flag) {
    isPromp = flag;
}

function panoramaGetPrompFlag() {
    return isPromp;
}

//获取所有线路名字和杆塔的数量
function panoramaGetLineData() {
    var url = 'http://117.27.139.39:4322/';
    $.ajax({
        url: url + 'lineList',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var js = JSON.parse(data.data);
            for (var i = 0; i < js.length; i++) {
                linename[js[i].name] = js[i].num;
            }
            var count = 0;
            var firstLine;
            //清空下拉框
            $("#selectLine").empty();
            //线路名添加下拉框
            for (var i in linename) {
                $("#selectLine").append("<option value='Value'>" + i + "</option>"); //为Select追加一个Option(下拉项)
                if(count==0){
                    firstLine = i;
                    count +=1;
                }     
            }
            //杆塔编号添加下拉框
            for (var i = 1; i <= linename[firstLine]; i++) {
                $("#selectPole").append("<option value='Value'>" + i + "</option>"); //为Select追加一个Option(下拉项)
            }
        }
    })
}
//线路名称改变，杆塔数量也跟着变
function panoramaChangeLine(name) {
    $("#selectPole").empty();
    for (var i = 1; i <= linename[name]; i++) {
        $("#selectPole").append("<option value='Value'>" + i + "</option>"); //为Select追加一个Option(下拉项)
    }
}


function init() {
    var container;
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    camera.target = new THREE.Vector3(0, 0, 0);
    scene = new THREE.Scene();
    var geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    materialTexture = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('img/1.jpg')
    });
    mesh = new THREE.Mesh(geometry, materialTexture);
    scene.add(mesh);
    sphere.push(mesh);

    spriteMap = new THREE.TextureLoader().load('img/sprite.png');
    spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
    //射线
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();


    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    //document.addEventListener('wheel', onDocumentMouseWheel, false);

    document.addEventListener('dragover', function (event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }, false);
    document.addEventListener('dragenter', function (event) {
        document.body.style.opacity = 0.5;
    }, false);
    document.addEventListener('dragleave', function (event) {
        document.body.style.opacity = 1;
    }, false);
    document.addEventListener('drop', function (event) {
        event.preventDefault();
        var reader = new FileReader();
        reader.addEventListener('load', function (event) {
            material.map.image.src = event.target.result;
            material.map.needsUpdate = true;
        }, false);
        reader.readAsDataURL(event.dataTransfer.files[0]);
        document.body.style.opacity = 1;
    }, false);
    //
    window.addEventListener('resize', onWindowResize, false);
}
function onWindowResize() {
    if (isPromp)
        return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function onDocumentMouseDown(event) {
    if (isPromp)
        return;
    mouseDownTime = new Date();
    event.preventDefault();
    isUserInteracting = true;
    onMouseDownMouseX = event.clientX;
    onMouseDownMouseY = event.clientY;
    onMouseDownLon = lon;
    onMouseDownLat = lat;
}
function onDocumentMouseMove(event) {
    if (isPromp)
        return;
    if (isUserInteracting === true) {
        lon = (onMouseDownMouseX - event.clientX) * 0.1 + onMouseDownLon;
        lat = (event.clientY - onMouseDownMouseY) * 0.1 + onMouseDownLat;
    }
}
function onDocumentMouseUp(event) {
    if (isPromp)
        return;
    if (!isShow)
        return;
    isUserInteracting = false;
    mouseUpTime = new Date();
    var offsetTime = mouseUpTime.getTime() - mouseDownTime.getTime();
    if (offsetTime < 200) {
        //判断是否点击到按钮
        var obj = document.elementFromPoint(event.clientX, event.clientY);
        //console.log(obj);
        if (obj.type == 'button') {
            return;
        }      
        if (!isPromp) {
            mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
            mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            //先判断是否点击到已经添加的热点，如果是就删除该热点
            var intersectBtns = raycaster.intersectObjects(buttons);
            if (intersectBtns.length > 0) {
                //console.log(intersectBtns[0].object);
                delete data[intersectBtns[0].object.name];
                //console.log(data);
                scene.remove(intersectBtns[0].object);
                return;
            }

            //点击位置添加热点按钮
            var intersects = raycaster.intersectObjects(sphere);
            if (intersects.length > 0) {
                //console.log(intersects[0].point.x + '  ' + intersects[0].point.y + '  ' + intersects[0].point.z);
                posionX = intersects[0].point.x;
                (posionX > 0) ? posionX = posionX - 10 : posionX = posionX + 10;
                posionY = intersects[0].point.y;
                (posionY > 0) ? posionY = posionY - 10 : posionY = posionY + 10;
                posionZ = intersects[0].point.z;
                (posionZ > 0) ? posionZ = posionZ - 10 : posionZ = posionZ + 10;
            }
            $('#selectDiv').show();
            isPromp = true;
            //弹出设置跳转杆塔界面
            //layer.prompt(
            //    {
            //        id: 'prompt',   //设置id后，不会重复弹出窗口
            //        title: '请输入跳转杆塔',
            //        //成功弹框的回调
            //        success: function (index) {
            //            console.log('promp success');
            //            isPromp = true;
            //        },
            //        //右上角关闭按钮回调
            //        cancel: function (index) {
            //            console.log('promp delete');
            //            isPromp = false;
            //        },
            //        //取消按钮的回调
            //        btn2: function () {
            //            console.log('promp delete');
            //            isPromp = false;
            //        }
            //    },
            //    //设置按钮的回调
            //    function (val, index) {
            //        layer.msg('设置完毕:' + val);
            //        layer.close(index);
            //        isPromp = false;
            //        var sprite1 = new THREE.Sprite(spriteMaterial);
            //        sprite1.scale.set(15, 15, 1);
            //        sprite1.position.set(x, y, z);
            //        sprite1.name = val;
            //        scene.add(sprite1);
            //        buttons.push(sprite1);
            //        data[val] = { x: x, y: y, z: z };
            //    }
            // );
        }
    }
}


function onDocumentMouseWheel(event) {
    if (isPromp)
        return;
    camera.fov += event.deltaY * 0.05;
    camera.updateProjectionMatrix();
}

function animate() {
    requestAnimationFrame(animate);
    update();
}
function update() {
    if (isPromp)
        return;
    if (isUserInteracting === false) {
        //lon += 0.1;
    }
    lat = Math.max(-85, Math.min(85, lat));
    phi = THREE.Math.degToRad(90 - lat);
    theta = THREE.Math.degToRad(lon);
    camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
    camera.target.y = 500 * Math.cos(phi);
    camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
    camera.lookAt(camera.target);
    /*
    //distortion
    camera.position.copy( camera.target ).negate();
    */
    renderer.render(scene, camera);
}

//加载指定杆塔的全景图-该功能已经没用
function LoadTexture(name) {
    name = name.replace('#', '');
    var arr = name.split("_")
    towername = arr[0];
    index = parseInt(arr[1]);
    scene.remove(mesh);
    materialTexture = new THREE.MeshBasicMaterial({
        map: TextureLoader.load('img/' + name + ".jpg")
    })
    mesh.material = materialTexture;
    scene.add(mesh);
}

//切换杆塔图片-该功能已经没用
function ChangeTexture(num) {
    index += num;
    var path = towername + "_" + index;
    var texture = TextureLoader.load('img/' + path + ".jpg",
            function (texture) {
                scene.remove(mesh);
                materialTexture = new THREE.MeshBasicMaterial({ map: texture });
                mesh.material = materialTexture;
                scene.add(mesh);
            },
            // 加载进度
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
           function (xhr) {
               console.log('An error happened');
               index -= num;
           }
        );
}


//加载预览本地的图片
function PanorameLoadLocalImg(url) {
    var texture = TextureLoader.load(url,
            function (texture) {
                scene.remove(mesh);
                materialTexture = new THREE.MeshBasicMaterial({ map: texture });
                mesh.material = materialTexture;
                scene.add(mesh);
                isShow = true;
				isUserInteracting = false;
            },
            // 加载进度
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
           function (xhr) {
               console.log('An error happened');
           }
        );
}

//生成热点按钮
function panoramaGenerateBtn() {
    var sprite1 = new THREE.Sprite(spriteMaterial);
    sprite1.scale.set(15, 15, 1);
    sprite1.position.set(posionX, posionY, posionZ);
    var LineText = $("#selectLine").find("option:selected").text();
    var PoleText = $("#selectPole").find("option:selected").text();
    var name = LineText + '_' + PoleText;
    sprite1.name = name
    scene.add(sprite1);
    buttons.push(sprite1);
    data[name] = { x: posionX, y: posionY, z: posionZ };
}

//清除保存的数据
function ClearData() {
    for (var i = 0; i < buttons.length; i++) {
        scene.remove(buttons[i]);
    }
    buttons = [];
    data = {};
    isShow = false;
    isUserInteracting = false;
}

//返回按钮回调
function PanoramaBackBtnCallback() {
    console.log('BackBtnCallback');   
    //ClearData();
    document.getElementById("container").style.display = 'none';
}

//提交按钮回到
function PanoramaSureBtnCallback() {
    console.log('SureBtnCallback');
    var str = JSON.stringify(data);
    console.log(str);
    
    document.getElementById("container").style.display = 'none';
//  return str;
}

function PanoramaGetData()
{
	var str = JSON.stringify(data);
	console.log('cccccccc')
	console.log(str)
	ClearData();
	return str;
}