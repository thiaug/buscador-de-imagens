$(criarEvento)

function criarEvento(){
	$('.btn1').click(function(){
		sendReq();
	});
}

function pesquisar(){
	var texto = document.getElementById("pesquisa").value;  
	return texto;
}

function rasparPagina(documento){
	var divReshot = documento.querySelectorAll('.grid-photo');
	var divGetty = documento.querySelectorAll('.gallery-mosaic-asset__link');
	var divStockSnap = documento.querySelectorAll('.page-wrap');
	var divGratis = documento.querySelectorAll('.single-photo-thumb');

	var checkBoxReshot = document.getElementById("check-reshot");
	var checkGettyimage = document.getElementById("check-gettyimages");
	var checkStockSnap = document.getElementById("check-stocksnap");
	var checkGratisography = document.getElementById("check-gratisography");

	if (checkBoxReshot.checked == true){
	divReshot.forEach(function(divReshot){
		var divNova = document.createElement('a');
		divNova.href = `https://www.reshot.com/search/${pesquisar()}`
		divNova.innerHTML = divReshot.childNodes[1].innerHTML;
        document.getElementById("reshot").appendChild(divNova);
        $("#reshot-nome").show();
	});
	}

	if (checkGettyimage.checked == true){
	divGetty.forEach(function(divGetty){
		var divNova = document.createElement('a');
		divNova.href = `https://www.gettyimages.com.br/fotos/${pesquisar()}?license=rf&family=creative&phrase=${pesquisar()}&sort=best#license`
		divNova.innerHTML = divGetty.childNodes[0].innerHTML;
		document.body.appendChild(divNova);
        document.getElementById("gettyimages").appendChild(divNova);
        $("#getty-nome").show();
	});
	}

	if (checkStockSnap.checked == true){
	divStockSnap.forEach(function(divStockSnap){
		var divNova = document.createElement('a');
		divNova.href = `https://stocksnap.io/search/${pesquisar()}`
		divNova.innerHTML = divStockSnap.childNodes[3].innerHTML;
		document.body.appendChild(divNova);
        document.getElementById("stocksnap").appendChild(divNova);
        $("#stocksnap-nome").show();
	});
	}

	if (checkGratisography.checked == true){
	divGratis.forEach(function(divGratis){
			var divNova = document.createElement('a');
			divNova.href = `https://gratisography.com/?s=${pesquisar()}`
			divNova.innerHTML = divGratis.childNodes[1].innerHTML;
			document.body.appendChild(divNova);
			document.getElementById("gratisographyimages").appendChild(divNova);
			$("#gratis-nome").show();
		});
		}

	$('a').attr('target', '_blank');
}

function sendReq(){
	var xhttp = new XMLHttpRequest(); 
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			var parser = new DOMParser();
			var documento = parser.parseFromString(this.responseText,"text/html");
			rasparPagina(documento);
		}
	};
	xhttp.open("GET", `https://cors-anywhere.herokuapp.com/https://www.reshot.com/search/${pesquisar()}`, true);
	xhttp.send();

	xhttp = new XMLHttpRequest(); //<- faz requisição, se passa pelo pelo browser
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){ //< - observa se o servidor se mexe || ready state 4 é a ultima etapa do request
			var parser = new DOMParser();
			var documento = parser.parseFromString(this.responseText,"text/html"); //<- response text = ler o response body de outra pagina e insere na nossa
			rasparPagina(documento);
		}
	};
	xhttp.open("GET", `https://cors-anywhere.herokuapp.com/https://www.gettyimages.com.br/fotos/${pesquisar()}?license=rf&family=creative&phrase=${pesquisar()}&sort=best#license`, true);
	xhttp.send();

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			var parser = new DOMParser();
			var documento = parser.parseFromString(this.responseText,"text/html");
			rasparPagina(documento);
		}
	};
	xhttp.open("GET", `https://cors-anywhere.herokuapp.com/https://stocksnap.io/search/${pesquisar()}`, true);
	xhttp.send();

	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			var parser = new DOMParser();
			var documento = parser.parseFromString(this.responseText,"text/html"); 
			rasparPagina(documento);
		}
	};
	xhttp.open("GET", `https://cors-anywhere.herokuapp.com/https://gratisography.com/?s=${pesquisar()}`, true);
	xhttp.send();
}  
