document.addEventListener('DOMContentLoaded', function() {
  const customerId = "{{ customer.id }}"; // Replace with actual customer ID from your context
  
  // DOM Elements
  const defaultAddressContainer = document.getElementById('default-address-container');
  const otherAddressContainer = document.getElementById('other-address-container');
  const addAddressButton = document.getElementById('add-address-button');
  const addAddressFormContainer = document.getElementById('add-address-form-container');
  const addAddressForm = document.getElementById('add-address-form');
  const cancelAddAddress = document.getElementById('cancel-add-address');
  const editFormContainer = document.getElementById('edit-address-form-container');
  const deleteModalContainer = document.getElementById('delete-modal-container');
  const loadingIndicator = document.getElementById('loading-indicator');

  // API Endpoints
  const API_BASE = '/apps/apw/app/apiaddress'; // Adjust to your API endpoint
  const ADDRESS_API = {
    list: `${API_BASE}/addresses?customerId=${customerId}`,
    create: `${API_BASE}/addresses`,
    update: (id) => `${API_BASE}/addresses/${id}`,
    delete: (id) => `${API_BASE}/addresses/${id}`,
    setDefault: (id) => `${API_BASE}/addresses/${id}/default`
  };

  // Initialize
  loadAddresses();

  // Event Listeners
  addAddressButton.addEventListener('click', showAddForm);
  cancelAddAddress.addEventListener('click', closeAddForm);
  addAddressForm.addEventListener('submit', handleAddAddress);

  // Load addresses from API
  async function loadAddresses() {
    try {
      showLoading();
      const response = await fetch(ADDRESS_API.list);
      const data = await response.json();
      
      if (data.defaultAddress) {
        renderDefaultAddress(data.defaultAddress);
      }
      
      if (data.addresses && data.addresses.length > 0) {
        renderOtherAddresses(data.addresses.filter(addr => !addr.isDefault));
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
      alert('Failed to load addresses. Please try again.');
    } finally {
      hideLoading();
    }
  }

  // Render default address
  function renderDefaultAddress(address) {
    defaultAddressContainer.innerHTML = `
      <div class="profile-address-display">
        <div class="profile-address">Default</div>
        <div class="profile-address-name">${address.first_name} ${address.last_name}</div>
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
        <div class="edit-icon" onclick="editAddress('${address.id}')">
          <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Edit icon SVG -->
          </svg>
        </div>
        <button class="delete-icon" onclick="showDeleteModal('${address.id}')">
          <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Delete icon SVG -->
          </svg>
        </button>
      </div>
    `;
  }

  // Render other addresses
  function renderOtherAddresses(addresses) {
    otherAddressContainer.innerHTML = addresses.map(address => `
      <div class="profile-details-container" id="address-${address.id}">
        <div class="profile-address-display">
          <div class="profile-address-name">${address.first_name} ${address.last_name}</div>
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
          <div class="edit-icon" onclick="editAddress('${address.id}')">
            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Edit icon SVG -->
            </svg>
          </div>
          <button class="delete-icon" onclick="showDeleteModal('${address.id}')">
            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Delete icon SVG -->
            </svg>
          </button>
        </div>
      </div>
    `).join('');
  }

  // Show add address form
  function showAddForm() {
    document.querySelector('.main-address').style.display = 'none';
    addAddressFormContainer.style.display = 'flex';
  }

  // Close add address form
  function closeAddForm() {
    addAddressFormContainer.style.display = 'none';
    document.querySelector('.main-address').style.display = 'block';
    addAddressForm.reset();
  }

  // Handle add address form submission
  async function handleAddAddress(event) {
    event.preventDefault();
    
    const formData = new FormData(addAddressForm);
    const addressData = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      company: formData.get('company'),
      phone: formData.get('phone'),
      address1: formData.get('address1'),
      address2: formData.get('address2'),
      city: formData.get('city'),
      province: formData.get('province'),
      country: formData.get('country'),
      zip: formData.get('zip'),
      default: formData.get('default') === 'true'
    };

    try {
      showLoading();
      const response = await fetch(ADDRESS_API.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customerId,
          address: addressData
        })
      });

      if (response.ok) {
        closeAddForm();
        await loadAddresses(); // Refresh the list
      } else {
        throw new Error('Failed to add address');
      }
    } catch (error) {
      console.error('Error adding address:', error);
      alert('Failed to add address. Please try again.');
    } finally {
      hideLoading();
    }
  }

  // Edit address
  window.editAddress = async function(addressId) {
    try {
      showLoading();
      // Fetch the specific address details
      const response = await fetch(`${ADDRESS_API.list}&addressId=${addressId}`);
      const address = await response.json();
      
      // Render edit form
      editFormContainer.innerHTML = `
        <div class="edit-addresses" style="display:flex">
          <div class="content-heading">Edit Address</div>
          <div class="edit-details-container profile-details-container">
            <div class="profile-details-display">
              <form id="edit-address-form-${addressId}" class="edit-address-form">
                <input type="hidden" name="form_type" value="customer_address">
                <input type="hidden" name="utf8" value="✓">
                <input type="hidden" name="address_id" value="${addressId}">

                <label class="edit-headings">Name (*)</label>
                <div class="row-flex">
                  <input type="text" class="input-fields" name="first_name" 
                    value="${address.first_name}" required>
                  <input type="text" class="input-fields" name="last_name" 
                    value="${address.last_name}" required>
                </div>

                <div class="row-flex">
                  <div class="col-flex">
                    <label class="edit-headings">Company</label>
                    <input type="text" class="input-fields" name="company" 
                      value="${address.company || ''}">
                  </div>
                  <div class="col-flex">
                    <label class="edit-headings">Phone number (*)</label>
                    <input type="tel" class="input-fields" name="phone" 
                      value="${address.phone || ''}" required
                      pattern="^\+?[\d\s\-\(\)]{10,20}$">
                  </div>
                </div>

                <label class="edit-headings">Address 1 (*)</label>
                <textarea class="input-fields" name="address1" required>${address.address1 || ''}</textarea>

                <label class="edit-headings">Address 2</label>
                <textarea class="input-fields" name="address2">${address.address2 || ''}</textarea>

                <div class="row-flex">
                  <div class="col-flex">
                    <label class="edit-headings">City (*)</label>
                    <input type="text" class="input-fields" name="city" 
                      value="${address.city || ''}" required>
                  </div>
                  <div class="col-flex">
                    <label class="edit-headings">Country (*)</label>
                    <input type="text" class="input-fields" name="country" 
                      value="${address.country || ''}" required>
                  </div>
                </div>

                <div class="row-flex">
                  <div class="col-flex">
                    <label class="edit-headings">Province</label>
                    <input type="text" class="input-fields" name="province" 
                      value="${address.province || ''}">
                  </div>
                  <div class="col-flex">
                    <label class="edit-headings">Zip (*)</label>
                    <input type="text" class="input-fields" name="zip" 
                      value="${address.zip || ''}" required>
                  </div>
                </div>

                ${!address.isDefault ? `
                <label class="edit-headings">
                  <input type="checkbox" name="default" value="true">
                  Set as default
                </label>
                ` : ''}

                <div class="btn-form">
                  <button type="button" onclick="closeEditForm()" class="edit-close">Back</button>
                  <button type="submit" class="edit-submit">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      `;

      // Hide main container and show edit form
      document.querySelector('.main-address').style.display = 'none';
      
      // Add form submit handler
      const editForm = document.getElementById(`edit-address-form-${addressId}`);
      editForm.addEventListener('submit', (e) => handleEditAddress(e, addressId));
      
    } catch (error) {
      console.error('Error loading address for edit:', error);
      alert('Failed to load address details. Please try again.');
    } finally {
      hideLoading();
    }
  };

  // Handle edit address form submission
  async function handleEditAddress(event, addressId) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const addressData = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      company: formData.get('company'),
      phone: formData.get('phone'),
      address1: formData.get('address1'),
      address2: formData.get('address2'),
      city: formData.get('city'),
      province: formData.get('province'),
      country: formData.get('country'),
      zip: formData.get('zip'),
      default: formData.get('default') === 'true'
    };

    try {
      showLoading();
      const response = await fetch(ADDRESS_API.update(addressId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customerId,
          address: addressData
        })
      });

      if (response.ok) {
        closeEditForm();
        await loadAddresses(); // Refresh the list
      } else {
        throw new Error('Failed to update address');
      }
    } catch (error) {
      console.error('Error updating address:', error);
      alert('Failed to update address. Please try again.');
    } finally {
      hideLoading();
    }
  }

  // Close edit form
  window.closeEditForm = function() {
    editFormContainer.innerHTML = '';
    document.querySelector('.main-address').style.display = 'block';
  };

  // Show delete confirmation modal
  window.showDeleteModal = function(addressId) {
    deleteModalContainer.innerHTML = `
      <div class="deletecustom-modal" style="display: flex;">
        <div class="deletecustom-modal-content">
          <img src="{{'delete.png' | asset_url}}" width="103px" height="79px"/>
          <div>Are you sure you want to delete?</div>
          <div class="deletecustom-modal-actions">
            <div>
              <button onclick="closeDeleteModal()" class="deletecancel-btn">Cancel</button>
            </div>
            <div>
              <button onclick="deleteAddress('${addressId}')" class="deleteconfirm-btn">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Close delete modal
  window.closeDeleteModal = function() {
    deleteModalContainer.innerHTML = '';
  };

  // Delete address
  window.deleteAddress = async function(addressId) {
    try {
      showLoading();
      const response = await fetch(ADDRESS_API.delete(addressId), {
        method: 'DELETE'
      });

      if (response.ok) {
        closeDeleteModal();
        await loadAddresses(); // Refresh the list
      } else {
        throw new Error('Failed to delete address');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      alert('Failed to delete address. Please try again.');
    } finally {
      hideLoading();
    }
  };

  // Helper functions
  function showLoading() {
    loadingIndicator.style.display = 'block';
  }

  function hideLoading() {
    loadingIndicator.style.display = 'none';
  }
});