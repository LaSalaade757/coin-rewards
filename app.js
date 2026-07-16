// =====================================================
// COIN REWARDS
// APP.JS V3
// Partie 1 / 3
// =====================================================

// ---------- Récompenses ----------

const rewards = [

{
    title: "50 Tours",
    type: "spin",
    status: "available",
    badge: true,
    date: "Publié le 16/07/2026",
    url: "https://coinmaster-daily.com/?gift=2212078"
},

{
    title: "50 Tours",
    type: "spin",
    status: "available",
    badge: true,
    date: "Publié le 16/07/2026",
    url: "https://coinmaster-daily.com/?gift=2212076"
},

{
    title: "25 Tours",
    type: "spin",
    status: "available",
    badge: true,
    date: "Publié le 16/07/2026",
    url: "https://coinmaster-daily.com/?gift=2212076"
},

{
    title: "50 Tours",
    type: "spin",
    status: "available",
    badge: false,
    date: "Publié le 16/07/2026",
    url: "https://coinmaster-daily.com/?gift=2212071"
},

{
    title: "50 Tours",
    type: "spin",
    status: "available",
    badge: false,
    date: "Publié le 16/07/2026",
    url: "https://coinmaster-daily.com/?gift=2212069"
},

{
    title: "50 Tours",
    type: "spin",
    status: "available",
    badge: false,
    date: "Publié le 16/07/2026",
    url: "https://coinmaster-daily.com/?gift=2212068"
},

{
    title: "50 Tours",
    type: "spin",
    status: "available",
    badge: false,
    date: "Publié le 16/07/2026",
    url: "https://coinmaster-daily.com/?gift=2212046"
},


{
    title: "50 Tours",
    type: "spin",
    status: "available",
    badge: false,
    date: "Publié le 16/07/2026",
    url: "https://coinmaster-daily.com/?gift=2212045"
},

{
    title: "50 Tours",
    type: "spin",
    status: "expired",
    badge: false,
    date: "Publié le 15/07/2026",
    url: "#"
},

{
    title: "50 Tours",
    type: "spin",
    status: "expired",
    badge: false,
    date: "Publié le 15/07/2026",
    url: "#"
},

{
    title: "50 Tours",
    type: "spin",
    status: "expired",
    badge: false,
    date: "Publié le 15/07/2026",
    url: "#"
},

];

// ---------- Eléments HTML ----------

const cards = document.getElementById("cards");
const searchInput = document.getElementById("searchInput");
const pageTitle = document.getElementById("pageTitle");

const navButtons =
document.querySelectorAll(".bottomBar button");

const filterButtons =
document.querySelectorAll(".filter");

// ---------- Variables ----------

let currentPage = "home";

let currentFilter = "all";

// ---------- Fonctions utilitaires ----------

function claimReward(url, status){

    if(status === "expired"){

        alert("Cette récompense est expirée.");

        return;

    }

    window.open(url, "_blank");

}

function getFilteredRewards(){

    const search =
    searchInput.value.toLowerCase();

    return rewards.filter(reward=>{

        const matchSearch =
        reward.title.toLowerCase().includes(search);

        const matchFilter =
        currentFilter === "all"
        ||
        reward.type === currentFilter;

        const matchPage =
        currentPage === "history"
        ||
        reward.status === "available";

        return (
            matchSearch &&
            matchFilter &&
            matchPage
        );

    });

}
// =====================================================
// AFFICHAGE DES CARTES
// =====================================================

function renderRewardCard(reward){

    return `

<div class="card">

${reward.badge ? '<div class="badge">NOUVEAU</div>' : ''}

<h2>${reward.title}</h2>

<div class="status ${reward.status==="available" ? "available" : "expired"}">

${reward.status==="available"
? "🟢 Disponible"
: "🔴 Expiré"}

</div>

<span class="time">

📅 ${reward.date}

</span>

<button
class="claimButton ${reward.status==="expired" ? "expired" : ""}"
onclick="claimReward('${reward.url}','${reward.status}')">

${reward.status==="available"
? "🎁 Récupérer"
: "Expiré"}

</button>

</div>

`;

}

// =====================================================
// AFFICHAGE DES PAGES
// =====================================================

function renderRewards(){

    cards.innerHTML="";
    pageTitle.innerHTML="";

    // ---------------- STATS ----------------

    if(currentPage==="stats"){

        const total=rewards.length;

        const available=
        rewards.filter(r=>r.status==="available").length;

        const expired=
        rewards.filter(r=>r.status==="expired").length;

        const spins=
        rewards.filter(r=>r.type==="spin").length;

        const coins=
        rewards.filter(r=>r.type==="coins").length;

        cards.innerHTML=`

<div class="card">

<h2>📊 Statistiques</h2>

<p>📦 Total : <b>${total}</b></p>

<p>🎰 Tours : <b>${spins}</b></p>

<p>🪙 Pièces : <b>${coins}</b></p>

<p>🟢 Disponibles : <b>${available}</b></p>

<p>🔴 Expirées : <b>${expired}</b></p>

</div>

`;

        return;

    }

    // ---------------- PLUS ----------------

    if(currentPage==="more"){

        cards.innerHTML=`

<div class="card">

<h2>⚙️ Plus</h2>

<p><b>Coin Rewards</b></p>

<br>

<p>Version : 1.0</p>

<br>

<p>
Ce site n'est pas affilié à Moon Active.
Les récompenses proviennent des liens officiels publiés par Coin Master.
</p>

</div>

`;

        return;

    }

    // ---------------- HOME / HISTORIQUE ----------------

    const filteredRewards=getFilteredRewards();

    if(filteredRewards.length===0){

        cards.innerHTML=`

<div class="card">

<h2>😢 Aucune récompense</h2>

<p>Aucun résultat trouvé.</p>

</div>

`;

        return;

    }

    filteredRewards.forEach(reward=>{

        cards.innerHTML+=renderRewardCard(reward);

    });

}
// =====================================================
// EVENEMENTS
// =====================================================

// Recherche

if(searchInput){

    searchInput.addEventListener("input",()=>{

        renderRewards();

    });

}

// Filtres

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const text=button.textContent.toLowerCase();

        if(text.includes("tour")){

            currentFilter="spin";

        }

        else if(text.includes("pièce")){

            currentFilter="coins";

        }

        else{

            currentFilter="all";

        }

        renderRewards();

    });

});

// Barre de navigation

navButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        navButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        currentPage=button.dataset.page;

        renderRewards();

    });

});

// =====================================================
// INITIALISATION
// =====================================================

renderRewards();