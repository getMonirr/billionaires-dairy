const tBody = document.getElementById('tBody');

const showLoading = (isLoading) => {
    const loadingElement = document.getElementById('loading');
    isLoading
        ? loadingElement.classList.remove('hidden')
        : loadingElement.classList.add('hidden')
}

const getBillionairesData = async () => {
    try {
        const res = await fetch(`https://forbes400.onrender.com/api/forbes400?limit=10`);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e);
    }
}

const setBillionairesData = async () => {
    tBody.innerHTML = '';
    showLoading(true);
    const billionaires = await getBillionairesData();
    billionaires.forEach(user => {
        showBillionairesUI(user)
    })
}

const showBillionairesUI = async (user) => {
    const { personName, countryOfCitizenship, industries, rank, finalWorth, uri } = user;

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td class="flex justify-between items-end gap-2">${personName}<a href="#${uri}"><img id="show-details"
        class="cursor-pointer" src="./images/icons/eye.svg" alt=""></a></td>
        <td>${countryOfCitizenship}</td>
        <td>${industries ? industries[0] : "not found"}</td>
        <td>${rank}</td>
        <td>$ ${finalWorth}</td>
        `;
    // modal start
    const { bios, squareImage, source, state, city, birthDate, gender, financialAssets } = user;
    const modalInBody = document.createElement('div');
    modalInBody.innerHTML = `
        <div class="modal" id="${uri}">
            <div class="modal-box w-6/12 max-w-5xl relative text-center bg-gray-300 text-black">
                <h3 class="pName font-bold text-4xl">${personName}</h3>
                <p class="text-xl mt-2">Biography</p>
                <p class="py-4 text-2xl text-gray-500">${bios ? bios[0] : 'not found'}</p>
                <div class="flex justify-center gap-8">
                    <div>
                        <figure>
                            <img src="${squareImage}" alt="${personName}">
                        </figure>
                        <figcaption>Source: ${source}</figcaption>
                    </div>
                    <div>
                        <div class="text-left">
                            <h2 class="mb-3 text-black text-xl">General Information</h2>
                            <hr class="border border-gray-400">
                            <p class="font-bold text-black text-lg">Citizenship: <span class="text-gray-500">${countryOfCitizenship}</span></p>
                            
                            <p class="font-bold text-black text-lg">State: <span class="text-gray-500">${state ? state : 'not found'}</span></p>
                            
                            <p class="font-bold text-black text-lg">City: <span class="text-gray-500">${city}</span></p>
                            
                            <p class="font-bold text-black text-lg">BirthDay: <span class="text-gray-500">${birthDate}</span></p>
                            
                            <p class="font-bold text-black text-lg">Gender: <span class="text-gray-500">${gender}</span></p>
                        </div>
                        <div class="text-left mt-8">
                            <h2 class="mb-3 text-black text-xl">Financial Information</h2>
                            <hr class="border border-gray-400">
                            <p class="font-bold text-black text-lg">Exchange: <span class="text-gray-500">${financialAssets ? financialAssets[0]?.exchange : 'not found'} </span></p>
                            
                            <p class="font-bold text-black text-lg">Ticker: <span class="text-gray-500">${financialAssets ? financialAssets[0]?.ticker : 'not found'}</span></p>
                            
                            <p class="font-bold text-black text-lg">Total Shares: <span class="text-gray-500">${financialAssets ? financialAssets[0]?.numberOfShares : 'not found'}</span></p>
                            
                            <p class="font-bold text-black text-lg">Share Price: <span class="text-gray-500">${financialAssets ? financialAssets[0]?.sharePrice : 'not found'}</span></p>
                            
                        </div>

                    </div>
                </div>
                <div class="modal-action">
                    <a href="#" class="btn btn-sm btn-circle absolute right-2 top-2">✕</a>
                </div>
            </div>
        </div>
        `
    document.body.appendChild(modalInBody);
    // modal end
    tBody.appendChild(tr);
    showLoading(false);
}



// by industry

document.getElementById('by-industry').addEventListener('click', async () => {
    showLoading(true);
    tBody.innerHTML = '';
    const res = await fetch(`https://forbes400.onrender.com/api/forbes400/industries/technology`);
    const data = await res.json();
    data.slice(0, 10).forEach(user => {
        showBillionairesUI(user);
    })
});

// show 10 billionaires
document.getElementById('show-billionaires').addEventListener('click', () => {
    setBillionairesData();
})


// by states
document.getElementById('by-states').addEventListener('click', async () => {
    showLoading(true);
    tBody.innerHTML = '';
    const res = await fetch(`https://forbes400.onrender.com/api/forbes400/states/Texas`);
    const data = await res.json();
    data.slice(0, 10).forEach(user => {
        showBillionairesUI(user);
    })
})

// show details 

