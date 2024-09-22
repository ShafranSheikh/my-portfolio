$('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
});

$(window).on('scroll load', function () {
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    // if (window.scrollY > 60) {
    //     document.querySelector('#scroll-top').classList.add('active');
    // } else {
    //     document.querySelector('#scroll-top').classList.remove('active');
    // }

    // scroll spy
    $('section').each(function () {
        let height = $(this).height();
        let offset = $(this).offset().top - 200;
        let top = $(window).scrollTop();
        let id = $(this).attr('id');

        if (top > offset && top < offset + height) {
            $('.navbar ul li a').removeClass('active');
            $('.navbar').find(`[href="#${id}"]`).addClass('active');
        }
    });
});

// smooth scrolling
$('a[href*="#"]').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top,
    }, 100, 'linear')
});

// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["frontend development", "backend development", "web designing", "web development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->
async function fetchData(type = "skills") {
    let response
    if(type === "skills"){
        response = await fetch("skills.json")
    }
    if(response){
        const data = await response.json();
        return data;
    }else{
        throw new Error("Cannot Fetch data");
    }
}
function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

async function fetchProjects(type = "portfolio"){
    let response;
    if(type === "portfolio"){
        response = await fetch("projects.json");
    }
    if(response){
        const data = await response.json();
        return data;
    }
    else{
        throw new Error("Something went wrong");
    }
}
function showProjects(portfolio){
    let portfolioContainer = document.getElementById("portfolio-container");
    let projectHTML = "";
    portfolio.forEach(project =>{
        projectHTML += `
            <div class="portfolio-box">
                <img src=${project.image} alt="">
                <div class="portfolio-layer">
                    <h4>${project.heading}</h4>
                    <p>${project.description}</p>
                    <div>
                        <a href=${project.links.view}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m7.375 16.781 1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 0 0 0 1.562l5 4zm9.25-9.562-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 0 0 0-1.562l-5-4zm-1.649-4.003-4 18-1.953-.434 4-18z"></path></svg></a>
                        <a href=${project.links.code}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M4.222 19.778a4.983 4.983 0 0 0 3.535 1.462 4.986 4.986 0 0 0 3.536-1.462l2.828-2.829-1.414-1.414-2.828 2.829a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.829-2.828-1.414-1.414-2.829 2.828a5.006 5.006 0 0 0 0 7.071zm15.556-8.485a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0L9.879 7.051l1.414 1.414 2.828-2.829a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.829 2.828 1.414 1.414 2.829-2.828z"></path><path d="m8.464 16.95-1.415-1.414 8.487-8.486 1.414 1.415z"></path></svg></a>
                    </div>
                    
                </div>
            </div>
        `
    });
    portfolioContainer.innerHTML = projectHTML;
}

fetchData().then(data => {
    showSkills(data);
});

fetchProjects("portfolio").then(data =>{
    showProjects(data);
})