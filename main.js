const fetchData = () => {
	const accessToken = `0425c91bfdb7154f282ff0ddac5620d695c3f32d`;
	const fetchHeaders = {
		"Content-Type" : "application/json",
		"Authorization": "Bearer 0425c91bfdb7154f282ff0ddac5620d695c3f32d"	
	}
	const fetchBody = JSON.stringify({
		query: `
			query{
				viewer{
					name
				}
			}
		`
	})
	fetch(`https://api.github.com/graphql`, {
		method: 'POST',
		headers : fetchHeaders,
		body: fetchBody
	})
	.then(res => res.json())
}
const nav = document.getElementById('primaryNav');

const firstSearchInput = document.getElementById('primarySearch');
const secondSearchInput = document.getElementById('secondarySearch');

document.getElementById('navToggler').onclick = () => {
	let secondaryNav = document.getElementById("secondaryNav");
	secondaryNav.classList.toggle("toggleHide");
}
firstSearchInput.onfocus = () => {
	const slash = document.getElementById('primarySearchSlash');
	window.matchMedia("(max-width:1600px)").matches ? 
		nav.style = `grid-template-columns: 1fr 0.5fr 0.5fr ` :  nav.style = `grid-template-columns: 1000px auto 1fr `;
	slash.style.display	 = 'none';
}
secondSearchInput.onfocus = () => {
	const slash = document.getElementById('secondarySearchSlash');
	slash.style.display = 'none';
}


firstSearchInput.onblur = () => {
	const slash = document.getElementById('primarySearchSlash');
	nav.style = `grid-template-columns: auto auto 1fr `;
	slash.style.display = 'block';
}
secondSearchInput.onblur = () => {
	const slash = document.getElementById('secondarySearchSlash');
	slash.style.display = 'block';
}