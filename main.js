
const nav = document.getElementById('primaryNav');

const firstSearchInput = document.getElementById('primarySearch');
const secondSearchInput = document.getElementById('secondarySearch');

document.getElementById('navToggler').onclick = () => {
	document.getElementById("secondaryNav").classList.toggle("toggleHide");
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

const profileStatus = document.getElementById('profileStatus');

profileStatus.onmouseenter = (e) => {
	const setStatus = document.getElementById('setStatus');
	
	if(window.matchMedia("(min-width:765px)").matches){
		setStatus.style.display = "block";
		e.target.style.borderRadius = "20px";
		document.getElementById("bio").style.position = "fixed";
		document.getElementById("bio").style.marginTop = "34px";	
	}
	if(window.matchMedia("(min-width:765px) and (max-width:820px)").matches){
		e.target.style.left = "50px"
	}
	if(window.matchMedia("(min-width:820px)").matches){
		e.target.style.left = "60px"
	}
}

window.onscroll = () => {
	const image = document.getElementById("avatar4");
	const text = document.getElementById("userName1")
	if(window.matchMedia("(min-width:765px)").matches && window.pageYOffset > 250){
		image.style.display = "block";
		text.style.display = "block";
	}

	if(window.matchMedia("(min-width:765px)").matches && window.pageYOffset < 250){
		
		image.style.display= "none"
		text.style.display = "none"
	}
}

profileStatus.onmouseleave = (e) => {
	if(window.matchMedia("(min-width:765px)").matches){
		setStatus.style.display = "";
		e.target.style.padding	= "8px";
		e.target.style.borderRadius = "";
		e.target.style.removeProperty('left');
		document.getElementById("bio").style.position = "";
		document.getElementById("bio").style.marginTop = "";
	}	
}

const getDate = (updatedAt) => { 
	let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const currentTime = new Date();
	const date = new Date(updatedAt);

	const timeDifference = currentTime.getTime() - date.getTime();

	const differenceInDays = timeDifference / (1000 * 3600 * 24);

	if(differenceInDays > 360) return `Updated on ${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;

	else if(differenceInDays > 30) return `Updated on ${months[date.getUTCMonth()]} ${date.getUTCDate()}`;

	else {
		return `Updated ${differenceInDays} ago`
	}

}

const createRepoObjects = (repo) => {
	const {
		name,
		updatedAt,
		forkCount,
		isFork,
		description,
		parent,
		licenseInfo,
		isPrivate,
		primaryLanguage		
	} = repo	

	const forks = isFork ? parent.forkCount : forkCount;
	const License = licenseInfo	? licenseInfo.name : null;
	const update = getDate(updatedAt);
	const forkFrom = parent	? parent.nameWithOwner	: null;
	const private = isPrivate;
	const topLanguage =  primaryLanguage ? primaryLanguage.name	: null;
	const topLanguageColor = primaryLanguage ? primaryLanguage.color : null;
	const descriptionOfRepo = description ? description	: null;
	const star = "Star";
	const nameOfRepo = name	;

	const container = document.createElement("div");
	container.id = "repository" ;
	container.className = "repository";
	const subContainer = document.createElement("div");
	const primaryData = document.createElement("div");
	primaryData.id = "primaryRepositoryData";
	primaryData.className = "primaryRepositoryData";
	const firstPrimaryDataSpan = document.createElement("span");
	const secondPrimaryDataSpan = document.createElement("span");
	firstPrimaryDataSpan.id = "repositoryName";
	firstPrimaryDataSpan.className = "repositoryName";
	firstPrimaryDataSpan.textContent = nameOfRepo;
	secondPrimaryDataSpan.id = "isPrivate";
	secondPrimaryDataSpan.className = "isPrivate";
	secondPrimaryDataSpan.textContent = "Private";

	const parentRepository = document.createElement("div");
	parentRepository.id = "forkedFrom";
	parentRepository.className = "forkedFrom";

	parentRepository.textContent = `Forked from ${forkFrom}`;

	const repositoryDetails = document.createElement("div");
	repositoryDetails.id = "repositoryDescription";
	repositoryDetails.className = "repositoryDescription";
	

	const secondaryData = document.createElement("div");
	secondaryData.id = "secondaryRepositoryData";
	secondaryData.className = "secondaryRepositoryData";

	//Language Container
	const repositoryLanguageContainer = document.createElement("div");
	repositoryLanguageContainer.id = "primaryLanguage";
	repositoryLanguageContainer.classList.add("primaryLanguage", "detailContainer")
	repositoryLanguageIcon = document.createElement("i");
	repositoryLanguageIcon.classList.add("fa", "fa-circle");
	repositoryLanguageIcon.style.color = topLanguageColor;
	const repositoryLanguageSpan = document.createElement("span");
	repositoryLanguageSpan.textContent = topLanguage;

	//prepending
	repositoryLanguageContainer.append(repositoryLanguageIcon, repositoryLanguageSpan);

	//forks Container
	const repositoryForksContainer = document.createElement("div");
	repositoryForksContainer.id = "repositoryForks";
	repositoryForksContainer.classList.add("repositoryForks", "detailContainer");
	repositoryForksIcon = document.createElement("i");
	repositoryForksIcon.classList.add("fa", "fa-code-branch");
	const repositoryForksSpan = document.createElement("span");
	repositoryForksSpan.textContent = forks;

	//prepending
	repositoryForksContainer.append(repositoryForksIcon, repositoryForksSpan);

	//License Container
	const repositoryLicenseContainer = document.createElement("div");
	repositoryLicenseContainer.classList.add("detailContainer");
	repositoryLicenseIcon = document.createElement("i")
	repositoryLicenseIcon.classList.add("fa", "fa-balance-scale");
	const repositoryLicenseSpan = document.createElement("span");
	repositoryLicenseSpan.textContent = License;

	//prepending
	repositoryLicenseContainer.append(repositoryLicenseIcon, repositoryLicenseSpan)

	//UpdatedAT Container
	const repositoryUpdateContainer = document.createElement("div");
	repositoryUpdateContainer.classList.add("detailContainer");
	repositoryUpdateContainer.textContent = update;


	//Star Container
	const repositoryStarContainer = document.createElement("div");
	repositoryStarContainer.id = "repositoryStar";
	repositoryStarContainer.className = "repositoryStar";
	repositoryStarIcon = document.createElement("i")
	repositoryStarIcon.classList.add("far", "fa-star");
	const repositoryStarSpan = document.createElement("span");
	repositoryStarSpan.className = "repositoryStarText";
	repositoryStarSpan.textContent = star


	//prepending
	repositoryStarContainer.append(repositoryStarIcon, repositoryStarSpan);

	primaryData.append(firstPrimaryDataSpan);
	isPrivate ?  primaryData.append(secondPrimaryDataSpan) : "";

	subContainer.append(primaryData);
	parent ? subContainer.append(parentRepository) : "";

	repositoryDetails.textContent = descriptionOfRepo;
	descriptionOfRepo ?  subContainer.append(repositoryDetails) : ""; 

	subContainer.append(secondaryData);

	primaryLanguage	 ? secondaryData.append( repositoryLanguageContainer ) : "";
	forks > 0 ? secondaryData.append( repositoryForksContainer ) : "";
	licenseInfo	? secondaryData.append( repositoryLicenseContainer ) : "";
	updatedAt ? secondaryData.append( repositoryUpdateContainer ) : "";

	container.append(subContainer);
	container.append(repositoryStarContainer);

	return container
}


const fetchData = () => {

	//Add Personal Token from github
	const token
	const fetchHeaders = {
		"Content-Type" : "application/json",
		"Authorization": `Bearer ${token}`	
	}
	const fetchBody = JSON.stringify({
		query: `
			query{
				viewer{
					login
					name
					email
					avatarUrl
					bio
					repositories(first:20){
						totalCount
						edges{
							node{
								name
								updatedAt
								forkCount
								isFork
								description
								parent{
									nameWithOwner
									forkCount
								}
								isPrivate
								licenseInfo{
									name
								}
								primaryLanguage{
									name
									color
								}
							}
						}
					}
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
	.then(data =>{
		const {bio, avatarUrl, login, name} = data.data.viewer; 
		
		const avatar1 = document.getElementById("avatar1");
		const avatar2 = document.getElementById("avatar2");
		const avatar3 = document.getElementById("avatar3");
		const avatar4 = document.getElementById("avatar4");
		avatar1.src = avatarUrl;
		avatar2.src = avatarUrl;
		avatar3.src = avatarUrl;
		avatar4.src = avatarUrl;
		document.getElementById("name").textContent = name;
		document.getElementById("userName").textContent = login;
		document.getElementById("navUserName").textContent = login;
		document.getElementById("bio").textContent = bio;
		const { repositories } = data.data.viewer;
		
		document.getElementById("totalTotal").textContent = repositories.totalCount;
		document.getElementById("repoCount").textContent = repositories.totalCount;
		document.getElementById("repoCount2").textContent = repositories.totalCount; 

		const parentContainer = document.getElementById('repositoriesContainer');

		for(let i = repositories.edges.length; i > 0; i--){

			let newObj = createRepoObjects(repositories.edges[i-1].node);
			parentContainer	.append(newObj);	
		}
	})
}

fetchData();

