    document.getElementById('addbtn').addEventListener('click', addingnote);
    document.getElementById('input').addEventListener('input', search);
    document.querySelector('#users img').addEventListener('click', selectusers);
    document.getElementById('mode').addEventListener('click', mode);

    let div = document.createElement('div');
    div.id = "divlist";
    let main = document.getElementById('main');
    main.appendChild(div);

    if (document.getElementById('divlist').children.length == 0) {
        let p = document.createElement('p');
        p.id = "p";
        document.getElementById('main').appendChild(p).innerText = "Nothing Found..";
    }

    if (!localStorage.impt) {
        let impt = [];
        localStorage.setItem('impt', JSON.stringify(impt));
    }
    nlisting();

    function addingnote() {
        if (document.querySelector('#addnote textarea').value == "") {
            document.querySelector('#addnote textarea').setAttribute('placeholder', "Please Write Something..");
        }
        else {
            var txtarea_value = document.querySelector('#addnote textarea').value;
            if (!localStorage.notes) {
                notes = [txtarea_value];
                localStorage.setItem('notes', JSON.stringify(notes));
            }
            else {
                let arr = JSON.parse(localStorage.getItem('notes'));
                arr.push(txtarea_value);
                localStorage.setItem('notes', JSON.stringify(arr));
            }
            document.querySelector('#addnote textarea').value = "";
            let lgh = document.getElementById('divlist').children.length;
            for (let p = 0; p < lgh; p++) {
                document.getElementById('divlist').children[0].remove();
            }
            nlisting();
            highlight();
        }
    }
    function nlisting() {
        if (!localStorage.notes || localStorage.notes.length == 2) {
            document.getElementById('p').style.display = "block";
        }
        else {
            let arr = JSON.parse(localStorage.notes);
            for (let i = 0; i < arr.length; i++) {
                let txt1 = document.createElement('h2');
                txt1.innerText = "Note" + (i + 1);
                let img = document.createElement('img');
                img.setAttribute('src', "impt.png");
                img.className = "img";
                img.addEventListener('click', function () {
                    important(this);
                });
                let txt2 = document.createElement('p');
                txt2.innerText = arr[i];
                let txt3 = document.createElement('a');
                txt3.innerText = "Delete Note";
                txt3.className = "txt3";
                txt3.addEventListener('click', function () {
                    deleten(this);
                });
                let nt = document.createElement('div');
                let id = "nt" + i;
                nt.className = "nt";
                nt.id = id;
                nt.appendChild(txt1);
                nt.appendChild(img);
                nt.appendChild(txt2);
                nt.appendChild(txt3);
                document.getElementById('divlist').appendChild(nt);
            }
            document.getElementById('p').style.display = "none";
            highlight();
        }

        let mode = document.getElementById('mode').src;
        if (mode.includes('sun.png')) {
            light();
        }
        else {
            dark();
        }
    }

    function deleten(p) {
        let arr = JSON.parse(localStorage.notes);
        let id = p.parentNode.id;
        id = id.replace('nt', "");
        arr.splice(id, 1);
        localStorage.setItem('notes', JSON.stringify(arr));

        arr = JSON.parse(localStorage.impt);
        let del = p.parentNode.children[2].innerText;
        let index = arr.indexOf(del);
        if (localStorage.getItem('impt').includes(del)) {
            arr.splice(index, 1);
        }
        localStorage.setItem('impt', JSON.stringify(arr));

        let lgh = document.getElementById('divlist').children.length;
        for (let p = 0; p < lgh; p++) {
            document.getElementById('divlist').children[0].remove();
        }
        nlisting();
    }
    function search() {
        var count = 0;
        var svalue = document.getElementById('input').value;
        let lgh = document.getElementById('divlist').children.length;
        for (let p = 0; p < lgh; p++) {
            document.getElementById('divlist').children[p].style.display = "none";
        }
        let arr = JSON.parse(localStorage.getItem('notes'));
        for (let k = 0; k < arr.length; k++) {
            if (JSON.stringify(arr[k]).includes(svalue)) {
                count++;
                let id = "nt" + k;
                document.getElementById(id).style.display = "block";
            }
            document.getElementById('p').style.display = "none";
        }
        if (count == 0) {
            document.getElementById('p').style.display = "block";
        }
        if (document.getElementById('input').value == "") {
            let lgh = document.getElementById('divlist').children.length;
            for (let p = 0; p < lgh; p++) {
                document.getElementById('divlist').children[0].remove();
            }
            nlisting();
            highlight();
        }
    }
    function important(l) {
        var found = 0;
        var v = l.parentNode.children[2].innerText;
        var arr = JSON.parse(localStorage.getItem('impt'));
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == v) {
                found = 1;
            }
        }
        if (found == 0) {
            if (!localStorage.getItem('impt').includes(v)) {
                arr.push(v);
                localStorage.setItem('impt', JSON.stringify(arr));

                l.setAttribute('src', "impt_g.png");
                l.parentNode.style.setProperty('border-color', "gold");
                l.parentNode.style.setProperty('border-width', "2px");
            }
        }
        else {
            arr.splice(arr.indexOf(v), 1);
            localStorage.setItem('impt', JSON.stringify(arr));
            l.setAttribute('src', "impt.png");
            l.parentNode.style.setProperty('border-color', "grey");
            l.parentNode.style.setProperty('border-width', "1.5px");
        }
    }
    function highlight() {
        let arr = JSON.parse(localStorage.getItem('impt'));
        for (let p = 0; p < arr.length; p++) {
            let count = document.getElementById('divlist').childElementCount;
            for (let k = 0; k < count; k++) {
                if (arr[p] == document.getElementById('divlist').children[k].children[2].innerText) {
                    document.getElementById('divlist').children[k].style.setProperty('border-color', 'gold');
                    document.getElementById('divlist').children[k].style.setProperty('border-width', '2px');
                    document.getElementById('divlist').children[k].children[1].setAttribute('src', "impt_g.png");
                }
            }
        }
    }
    function selectusers() {
        // // let create = document.createElement('a');
        // // create.className=("create");
        // // create.innerText="Create New User";
        // // create.setAttribute('href',"#");
        // // document.getElementById('users').appendChild(create);

        // console.log('okokokk');
    }
    function mode() {
        let mode = document.getElementById('mode').src;
        if (mode.includes('sun.png')) {
            document.getElementById('mode').src = "moon.png";
            dark();
        }
        else {
            document.getElementById('mode').src = "sun.png";
            light();
        }
    }
    function light() {
        document.body.style.backgroundColor = "transparent";
        document.querySelector("#heading1").style.color = "black";
        document.querySelector("#addnote h4").style.color = "black";
        document.getElementById('heading2').style.color = "black";
        document.querySelector('#addnote textarea').style.backgroundColor = "white";
        document.querySelector('#addnote textarea').style.color = "black";
        document.getElementById('divlist').style.backgroundColor = "transparent";
        let lg = document.getElementsByClassName('nt').length;
        for (let l = 0; l < lg; l++) {
            document.getElementsByClassName('nt')[l].children[2].style.color = "black";
            document.getElementsByClassName('nt')[l].children[0].style.color = "black";
        }
    }
    function dark() {
        document.body.style.backgroundColor = "black";
        document.querySelector("#heading1").style.color = "white";
        document.querySelector("#addnote h4").style.color = "white";
        document.getElementById('head').style.borderBottom = "2px solid white";
        document.getElementById('heading2').style.color = "white";
        document.querySelector('#addnote textarea').style.borderRadius = "6px";
        document.querySelector('#addnote textarea').style.backgroundColor = "rgb(40,44,52)";
        document.querySelector('#addnote textarea').style.color = "#ff9999";
        document.getElementById('divlist').style.backgroundColor = "rgb(40,44,52)";
        let lg = document.getElementsByClassName('nt').length;
        for (let l = 0; l < lg; l++) {
            document.getElementsByClassName('nt')[l].children[2].style.color = "rgb(165, 165, 165)";
            document.getElementsByClassName('nt')[l].children[0].style.color = "#d9d9d9";
        }
    }