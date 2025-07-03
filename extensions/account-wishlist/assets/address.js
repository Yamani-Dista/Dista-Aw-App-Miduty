window.showDeletePop = function (addressId) {
    console.log(addressId)
    const popup = document.getElementById('deletepopupModal-' + addressId);
    console.log("popup idhi",popup)
    if (popup) popup.style.display = 'flex';
};

window.closeDeletePop = function (addressId) {
    const popup = document.getElementById('deletepopupModal-' + addressId);
    if (popup) popup.style.display = 'none';
};

function addressAdd() {
    const editContainer = document.querySelector('.add-addresses');
    const mainContainer = document.querySelector('.main-address');
    if (editContainer) editContainer.style.display = 'flex';
    if (mainContainer) mainContainer.style.display = 'none';
}

function closeAddForm() {
    const editContainer = document.querySelector('.add-addresses');
    const mainContainer = document.querySelector('.main-address');
    if (editContainer) editContainer.style.display = 'none';
    if (mainContainer) mainContainer.style.display = 'flex';
}

function addressEdit(id) {
    const mainContainer = document.querySelector('.main-address');
    const editContainer = document.querySelector('#address-block-' + id);
    if (mainContainer) mainContainer.style.display = 'none';
    if (editContainer) editContainer.style.display = 'flex';
}

function closeEditForm(id) {
    const mainContainer = document.querySelector('.main-address');
    const editContainer = document.querySelector('#address-block-' + id);
    if (mainContainer) mainContainer.style.display = 'flex';
    if (editContainer) editContainer.style.display = 'none';
}

async function updateDefaultAddress(defaultAddress, customerId, defaultId) {
    console.log('Updating default address:', defaultAddress, 'for customer:', customerId, 'with ID:', defaultAddress.id);
    const addressContainers = document.querySelectorAll('.default-address-container');
    addressContainers.forEach(container => {
        container.innerHTML = `
            <div class="profile-address-container profile-details-container" id="address-${defaultAddress.id}">
                <div class="profile-address-display">
                    <div class="profile-address">Default</div>
                    <div class="saving-address">
                        <div class="profile-address-name">
                            ${defaultAddress.firstName || ''} ${defaultAddress.lastName || ''}
                        </div>
                        <address class="profile-address-line profile-details">
                            ${defaultAddress.company ? defaultAddress.company + '<br>' : ''}
                            ${defaultAddress.address1 ? defaultAddress.address1 + '<br>' : ''}
                            ${defaultAddress.address2 ? defaultAddress.address2 + '<br>' : ''}
                            ${defaultAddress.city ? defaultAddress.city + ',' : ''}
                            ${defaultAddress.province ? defaultAddress.province + '<br>' : ''}
                            ${defaultAddress.country ? defaultAddress.country + '<br>' : ''}
                            ${defaultAddress.zip ? defaultAddress.zip : ''}
                        </address>
                        ${defaultAddress.phone ? `<div class="profile-details">${defaultAddress.phone}</div>` : ''}
                    </div>
                </div>
                <div class="address-icon">
                    <div class="edit-icon" onclick="addressEdit(${defaultAddress.id})">
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.20968 2.79498C8.64437 2.32401 8.86172 2.08853 9.09268 1.95117C9.64996 1.61974 10.3362 1.60943 10.9027 1.92398C11.1375 2.05435 11.3616 2.2832 11.8096 2.74091C12.2577 3.19861 12.4817 3.42747 12.6093 3.66734C12.9172 4.24612 12.9072 4.94709 12.5827 5.51637C12.4482 5.7523 12.2177 5.97433 11.7567 6.41838L6.27122 11.7018C5.39753 12.5433 4.96069 12.9641 4.41472 13.1773C3.86876 13.3906 3.26856 13.3749 2.06815 13.3435L1.90482 13.3392C1.53938 13.3296 1.35666 13.3249 1.25045 13.2043C1.14423 13.0838 1.15873 12.8977 1.18773 12.5254L1.20348 12.3233C1.28511 11.2755 1.32592 10.7517 1.53052 10.2808C1.73511 9.80985 2.08802 9.42748 2.79385 8.66275L8.20968 2.79498Z" stroke="#565656" stroke-width="1.5" stroke-linejoin="round"/>
                            <path d="M7.58337 2.86182L11.6667 6.94515" stroke="#565656" stroke-width="1.5" stroke-linejoin="round"/>
                            <path d="M8.16669 13.3618L12.8334 13.3618" stroke="#565656" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <button type="button" class="delete-icon" onclick="showDeletePop(${defaultAddress.id})">
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.415 3.20923L11.0239 9.53691C10.9239 11.1536 10.874 11.9619 10.4687 12.5431C10.2684 12.8304 10.0104 13.0729 9.71128 13.2552C9.10623 13.6238 8.29634 13.6238 6.67657 13.6238C5.05466 13.6238 4.24371 13.6238 3.63824 13.2545C3.3389 13.0719 3.08087 12.829 2.88059 12.5412C2.47549 11.9591 2.42662 11.1496 2.32888 9.53064L1.94727 3.20923" stroke="#565656" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M1 3.20914H12.3613M9.24057 3.20914L8.80968 2.32026C8.52345 1.72981 8.38033 1.43458 8.13346 1.25046C8.0787 1.20962 8.02072 1.17329 7.96008 1.14183C7.68671 1 7.35862 1 6.70245 1C6.0298 1 5.69347 1 5.41556 1.14777C5.35397 1.18052 5.2952 1.21832 5.23985 1.26079C4.99012 1.45237 4.85062 1.7584 4.57162 2.37046L4.18933 3.20914" stroke="#565656" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M5.10303 10.1523L5.10303 6.36524" stroke="#565656" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M8.25879 10.1523L8.25879 6.36517" stroke="#565656" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <div id="deletepopupModal-${defaultAddress.id}" class="deletecustom-modal" style="display: none;">
                        <div class="deletecustom-modal-content">
                            <img src="https://cdn.shopify.com/extensions/e15d7610-9bae-49ec-b79e-1a8220ec70b9/0.0.0/assets/delete.png?v=1750152942" width="103px" height="79px">
                            <div>Are you sure you want to delete?</div>
                            <div class="deletecustom-modal-actions">
                                <div>
                                    <button onclick="closeDeletePop(${defaultAddress.id})" class="deletecancel-btn">
                                        Cancel
                                    </button>
                                </div>
                                <div>
                                    <form
                                        class="address-delete-form"
                                        method="post"
                                        action="/account/addresses/${defaultAddress.id}"
                                        onsubmit="handleDeleteSubmit(event,${defaultAddress.id},${customerId},${defaultId})"
                                    >
                                        <input type="hidden" name="_method" value="delete">
                                        <button type="submit" class="deleteconfirm-btn">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

}

async function updateOtherAddresses(customerId,storeUrl) {
    console.log('Updating other addresses for customer: ppppppppppppppppppppp', customerId);
    try {
        // const response = await fetch(`/apps/rvp/app/apiaddress?customerId=${customerId}`);
        const response = await fetch(`/apps/apw/app/apiaddress?customerId=${customerId}&storeUrl=${encodeURIComponent(storeUrl)}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        const allAddresses = data.allAddress || [];
        const defaultAddressId = data.defaultAddress?.id;
        const container = document.querySelector('.other-address-container');
        if (!container) return;

        // Remove all non-add-address children
        const existingAddresses = container.querySelectorAll('.profile-details-container:not(.add-address)');
        existingAddresses.forEach(el => el.remove());

        allAddresses.forEach(address => {
            // Skip default address
            if (address.id == defaultAddressId) return;

            const html = `
                <div class="profile-details-container" id="address-${address.id}">
                    <div class="profile-address-display">
                        <div class="profile-address-name">
                            ${address.firstName || ''} ${address.lastName || ''}
                        </div>
                        <address class="profile-address-line profile-details">
                            ${address.company ? address.company + '<br>' : ''}
                            ${address.address1 ? address.address1 + '<br>' : ''}
                            ${address.address2 ? address.address2 + '<br>' : ''}
                            ${address.city ? address.city + ',' : ''}
                            ${address.province ? address.province + '<br>' : ''}
                            ${address.country ? address.country + '<br>' : ''}
                            ${address.zip ? address.zip : ''}
                        </address>
                        ${address.phone ? `<div class="profile-details">${address.phone}</div>` : ''}
                    </div>
                    <div class="address-icon">
                        <div class="edit-icon" onclick="addressEdit(${address.id})">
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.20968 2.79498C8.64437 2.32401 8.86172 2.08853 9.09268 1.95117C9.64996 1.61974 10.3362 1.60943 10.9027 1.92398C11.1375 2.05435 11.3616 2.2832 11.8096 2.74091C12.2577 3.19861 12.4817 3.42747 12.6093 3.66734C12.9172 4.24612 12.9072 4.94709 12.5827 5.51637C12.4482 5.7523 12.2177 5.97433 11.7567 6.41838L6.27122 11.7018C5.39753 12.5433 4.96069 12.9641 4.41472 13.1773C3.86876 13.3906 3.26856 13.3749 2.06815 13.3435L1.90482 13.3392C1.53938 13.3296 1.35666 13.3249 1.25045 13.2043C1.14423 13.0838 1.15873 12.8977 1.18773 12.5254L1.20348 12.3233C1.28511 11.2755 1.32592 10.7517 1.53052 10.2808C1.73511 9.80985 2.08802 9.42748 2.79385 8.66275L8.20968 2.79498Z" stroke="#565656" stroke-width="1.5" stroke-linejoin="round"/>
                                <path d="M7.58337 2.86182L11.6667 6.94515" stroke="#565656" stroke-width="1.5" stroke-linejoin="round"/>
                                <path d="M8.16669 13.3618L12.8334 13.3618" stroke="#565656" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <button class="delete-icon" onclick="showDeletePop(${address.id})">
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.415 3.20923L11.0239 9.53691C10.9239 11.1536 10.874 11.9619 10.4687 12.5431C10.2684 12.8304 10.0104 13.0729 9.71128 13.2552C9.10623 13.6238 8.29634 13.6238 6.67657 13.6238C5.05466 13.6238 4.24371 13.6238 3.63824 13.2545C3.3389 13.0719 3.08087 12.829 2.88059 12.5412C2.47549 11.9591 2.42662 11.1496 2.32888 9.53064L1.94727 3.20923" stroke="#565656" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M1 3.20914H12.3613M9.24057 3.20914L8.80968 2.32026C8.52345 1.72981 8.38033 1.43458 8.13346 1.25046C8.0787 1.20962 8.02072 1.17329 7.96008 1.14183C7.68671 1 7.35862 1 6.70245 1C6.0298 1 5.69347 1 5.41556 1.14777C5.35397 1.18052 5.2952 1.21832 5.23985 1.26079C4.99012 1.45237 4.85062 1.7584 4.57162 2.37046L4.18933 3.20914" stroke="#565656" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M5.10303 10.1523L5.10303 6.36524" stroke="#565656" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M8.25879 10.1523L8.25879 6.36517" stroke="#565656" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <div id="deletepopupModal-${address.id}" class="deletecustom-modal" style="display: none;">
                            <div class="deletecustom-modal-content">
                                <img src="/assets/delete.png" width="103px" height="79px">
                                <div>Are you sure you want to delete?</div>
                                <div class="deletecustom-modal-actions">
                                    <div>
                                        <button onclick="closeDeletePop(${address.id})" class="deletecancel-btn">Cancel</button>
                                    </div>
                                    <div>
                                        <form
                                            class="address-delete-form"
                                            method="post"
                                            action="/account/addresses/${address.id}"
                                            onsubmit="handleDeleteSubmit(event,${address.id},${customerId},${defaultAddressId})"
                                        >
                                            <input type="hidden" name="_method" value="delete">
                                            <button type="submit" class="deleteconfirm-btn">Delete</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            const addBtn = container.querySelector('.add-address');
            if (addBtn) {
                addBtn.insertAdjacentHTML('beforebegin', html);
            } else {
                container.insertAdjacentHTML('beforeend', html);
            }
        });
    } catch (err) {
        console.error('Failed to update other addresses:', err);
    }
}

function handleDeleteSubmit(event, id, customerId, defaultId,storeUrl) {
    event.preventDefault();
    const form = event.target;
    
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
    })
    .then(async (response) => {
        if (!response.ok) throw new Error('Delete failed');
        
        console.log('Address deleted');
        const deleteAddress = document.getElementById('address-' + id);
        if (deleteAddress) deleteAddress.remove();
        closeDeletePop(id);

        // If the deleted address was the default, update UI with new default
        if (id == defaultId) {
            try {
                // const response = await fetch(`/apps/rvp/app/apiaddress?customerId=${customerId}`);
                const response = await fetch(`/apps/apw/app/apiaddress?customerId=${customerId}&storeUrl=${encodeURIComponent(storeUrl)}`);
                if (!response.ok) throw new Error('Failed to fetch updated addresses');
                
                const data = await response.json();
                if (data.defaultAddress) {
                    updateDefaultAddress(data.defaultAddress, customerId, defaultId);
                    updateOtherAddresses(customerId);
                }
            } catch (err) {
                console.error('Failed to update default address:', err);
            }
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to delete address. Please try again.');
    });
}

function handleEditSubmit(event, id, customerId, defaultId) {

    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
    })
    .then(async (response) => {
        if (!response.ok) throw new Error('Update failed');
        
        closeEditForm(id);
        const firstName = formData.get('address[first_name]') || '';
        const lastName = formData.get('address[last_name]') || '';
        const company = formData.get('address[company]') || '';
        const address1 = formData.get('address[address1]') || '';
        const address2 = formData.get('address[address2]') || '';
        const city = formData.get('address[city]') || '';
        const province = formData.get('address[province]') || '';
        const country = formData.get('address[country]') || '';
        const zip = formData.get('address[zip]') || '';
        const phone = formData.get('address[phone]') || '';
        const defaultBool = formData.get('address[default]') === '1';

        if (defaultBool) {
            const defaultAddress = {
                id: id,
                firstName: firstName,
                lastName: lastName,
                company: company,
                address1: address1,
                address2: address2,
                city: city,
                province: province,
                country: country,
                zip: zip,
                phone: phone
            };
            updateDefaultAddress(defaultAddress, customerId, defaultId);
            updateOtherAddresses(customerId);
        } else {
            // Just update the display for this address
            let html = `
                <div class="profile-address-name">${firstName} ${lastName}</div>
                <address class="profile-address-line profile-details">
                    ${company ? company + '<br>' : ''}
                    ${address1 ? address1 + '<br>' : ''}
                    ${address2 ? address2 + '<br>' : ''}
                    ${city ? city + ',' : ''}
                    ${province ? province + '<br>' : ''}
                    ${country ? country + '<br>' : ''}
                    ${zip ? zip : ''}
                </address>
                ${phone ? `<div class="profile-details">${phone}</div>` : ''}
            `;

            const containerDisplay = document.querySelector(`#address-${id} .profile-address-display`);
            if (containerDisplay) {
                containerDisplay.innerHTML = html;
            }
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to update address. Please try again.');
    });
}

async function addAddressTab(customerId,storeUrl) {
    try {
        // const response = await fetch(`/apps/rvp/app/apiaddress?customerId=${customerId}`);
        const response = await fetch(`/apps/apw/app/apiaddress?customerId=${customerId}&storeUrl=${encodeURIComponent(storeUrl)}`);
        if (!response.ok) throw new Error('Failed to fetch address data');
        
        const data = await response.json();
        const lastAddress = data.address;
        if (!lastAddress) return;
        
        const gid = lastAddress.id;
        const id = gid.match(/\/(\d+)(\?|$)/)?.[1];
        const defaultAddress = data.defaultAddress;
        const defaultAdressId = defaultAddress?.id;
        const defaultId = defaultAdressId?.match(/\/(\d+)(\?|$)/)?.[1];

        if (!defaultId || defaultId !== id) {
            const addressContainer = document.querySelector('.other-address-container');
            if (addressContainer) {
                addressContainer.insertAdjacentHTML('afterbegin', `
                    <div class="profile-details-container" id="address-${id}">
                        <div class="profile-address-display">
                            <div class="profile-address-name">${lastAddress.firstName} ${lastAddress.lastName}</div>
                            <address class="profile-address-line profile-details">
                                ${lastAddress.company ? lastAddress.company + '<br>' : ''}
                                ${lastAddress.address1 ? lastAddress.address1 + '<br>' : ''}
                                ${lastAddress.address2 ? lastAddress.address2 + '<br>' : ''}
                                ${lastAddress.city ? lastAddress.city + ',' : ''}
                                ${lastAddress.province ? lastAddress.province + '<br>' : ''}
                                ${lastAddress.country ? lastAddress.country + '<br>' : ''}
                                ${lastAddress.zip ? lastAddress.zip : ''}
                            </address>
                            ${lastAddress.phone ? `<div class="profile-details">${lastAddress.phone}</div>` : ''}
                        </div>
                        <div class="address-icon">
                            <div class="edit-icon" onclick="addressEdit(${id})">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.20968 2.79498C8.64437 2.32401 8.86172 2.08853 9.09268 1.95117C9.64996 1.61974 10.3362 1.60943 10.9027 1.92398C11.1375 2.05435 11.3616 2.2832 11.8096 2.74091C12.2577 3.19861 12.4817 3.42747 12.6093 3.66734C12.9172 4.24612 12.9072 4.94709 12.5827 5.51637C12.4482 5.7523 12.2177 5.97433 11.7567 6.41838L6.27122 11.7018C5.39753 12.5433 4.96069 12.9641 4.41472 13.1773C3.86876 13.3906 3.26856 13.3749 2.06815 13.3435L1.90482 13.3392C1.53938 13.3296 1.35666 13.3249 1.25045 13.2043C1.14423 13.0838 1.15873 12.8977 1.18773 12.5254L1.20348 12.3233C1.28511 11.2755 1.32592 10.7517 1.53052 10.2808C1.73511 9.80985 2.08802 9.42748 2.79385 8.66275L8.20968 2.79498Z" stroke="#565656" stroke-width="1.5" stroke-linejoin="round"/>
                                    <path d="M7.58337 2.86182L11.6667 6.94515" stroke="#565656" stroke-width="1.5" stroke-linejoin="round"/>
                                    <path d="M8.16669 13.3618L12.8334 13.3618" stroke="#565656" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <button class="delete-icon" onclick="showDeletePop(${id})">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.415 3.20923L11.0239 9.53691C10.9239 11.1536 10.874 11.9619 10.4687 12.5431C10.2684 12.8304 10.0104 13.0729 9.71128 13.2552C9.10623 13.6238 8.29634 13.6238 6.67657 13.6238C5.05466 13.6238 4.24371 13.6238 3.63824 13.2545C3.3389 13.0719 3.08087 12.829 2.88059 12.5412C2.47549 11.9591 2.42662 11.1496 2.32888 9.53064L1.94727 3.20923" stroke="#565656" stroke-width="1.5" stroke-linecap="round"/>
                                    <path d="M1 3.20914H12.3613M9.24057 3.20914L8.80968 2.32026C8.52345 1.72981 8.38033 1.43458 8.13346 1.25046C8.0787 1.20962 8.02072 1.17329 7.96008 1.14183C7.68671 1 7.35862 1 6.70245 1C6.0298 1 5.69347 1 5.41556 1.14777C5.35397 1.18052 5.2952 1.21832 5.23985 1.26079C4.99012 1.45237 4.85062 1.7584 4.57162 2.37046L4.18933 3.20914" stroke="#565656" stroke-width="1.5" stroke-linecap="round"/>
                                    <path d="M5.10303 10.1523L5.10303 6.36524" stroke="#565656" stroke-width="1.5" stroke-linecap="round"/>
                                    <path d="M8.25879 10.1523L8.25879 6.36517" stroke="#565656" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                            </button>
                            <div id="deletepopupModal-${id}" class="deletecustom-modal" style="display: none;">
                                <div class="deletecustom-modal-content">
                                    <img src="/assets/delete.png" width="103px" height="79px"/>
                                    <div>Are you sure you want to delete?</div>
                                    <div class="deletecustom-modal-actions">
                                        <div>
                                            <button onclick="closeDeletePop(${id})" class="deletecancel-btn">Cancel</button>
                                        </div>
                                        <div>
                                            <form
                                                class="address-delete-form"
                                                method="post"
                                                action="/account/addresses/${id}"
                                                onsubmit="handleDeleteSubmit(event,${id},${customerId},${defaultId})"
                                            >
                                                <input type="hidden" name="_method" value="delete">
                                                <button type="submit" class="deleteconfirm-btn">Delete</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);

                const editContainer = document.querySelector('.address-form');
                if (editContainer) {
                    const editHtml = `
                        <div class="edit-addresses" style="display:none" id="address-block-${id}">
                            <div class="content-heading">Edit Address</div>
                            <div class="edit-details-container profile-details-container">
                                <div class="profile-details-display">
                                    <form
                                        method="post"
                                        action="/account/addresses/${id}"
                                        id="edit-address-form-${id}"
                                        onsubmit="handleEditSubmit(event, ${id}, ${customerId}, ${defaultId})"
                                    >
                                        <input type="hidden" name="form_type" value="customer_address">
                                        <input type="hidden" name="utf8" value="✓">
                                        <input type="hidden" name="_method" value="put">
                                        <label class="edit-headings">Name (*)</label>
                                        <div class="row-flex">
                                            <input
                                                type="text"
                                                class="input-fields"
                                                name="address[first_name]"
                                                placeholder="first name"
                                                value="${lastAddress.firstName}"
                                                required
                                            >
                                            <input
                                                type="text"
                                                class="input-fields"
                                                name="address[last_name]"
                                                placeholder="last name"
                                                value="${lastAddress.lastName}"
                                            >
                                        </div>
                                        <div class="row-flex">
                                            <div class="col-flex">
                                                <label class="edit-headings">Company</label>
                                                <input type="text" class="input-fields" name="address[company]" value="${lastAddress.company || ''}">
                                            </div>
                                            <div class="col-flex">
                                                <label class="edit-headings">Phone number (*)</label>
                                                <input
                                                    type="tel"
                                                    class="input-fields"
                                                    name="address[phone]"
                                                    value="${lastAddress.phone || ''}"
                                                    pattern="^\\+?[\\d\\s\\-\\(\\)]{10,20}$"
                                                    required
                                                >
                                            </div>
                                        </div>
                                        <label class="edit-headings">Address 1 (*)</label>
                                        <textarea class="input-fields" name="address[address1]" required>${lastAddress.address1 || ''}</textarea>
                                        <label class="edit-headings">Address 2</label>
                                        <textarea class="input-fields" name="address[address2]">${lastAddress.address2 || ''}</textarea>
                                        <div class="row-flex">
                                            <div class="col-flex">
                                                <label class="edit-headings">City (*)</label>
                                                <input type="text" class="input-fields" name="address[city]" value="${lastAddress.city || ''}" required>
                                            </div>
                                            <div class="col-flex">
                                                <label class="edit-headings">Country (*)</label>
                                                <input type="text" class="input-fields" name="address[country]" value="${lastAddress.country || ''}" required>
                                            </div>
                                        </div>
                                        <div class="row-flex">
                                            <div class="col-flex">
                                                <label class="edit-headings">Province</label>
                                                <input type="text" class="input-fields" name="address[province]" value="${lastAddress.province || ''}">
                                            </div>
                                            <div class="col-flex">
                                                <label class="edit-headings">Zip (*)</label>
                                                <input type="text" class="input-fields" name="address[zip]" value="${lastAddress.zip || ''}" required>
                                            </div>
                                        </div>
                                        <label class="edit-headings">
                                            <input type="checkbox" name="address[default]" value="1"> Set as default
                                        </label>
                                        <div class="btn-form">
                                            <span class="edit-close" onclick="closeEditForm(${id})">Back</span>
                                            <button type="submit" class="edit-submit">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    `;
                    editContainer.insertAdjacentHTML('beforeend', editHtml);
                }
            }
        } else if (defaultAddress) {
            updateDefaultAddress(defaultAddress, customerId, defaultId);
        }
    } catch (err) {
        console.error('Error in addAddressTab:', err);
    }
}

function handleAddAddress(event, customerId) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
    })
    .then((response) => {
        if (!response.ok) throw new Error('Add address failed');
        
        closeAddForm();
        addAddressTab(customerId);
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to add address. Please try again.');
    });
}