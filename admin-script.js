// ============ ADMIN DASHBOARD FUNCTIONALITY ============

// ============ TAB SWITCHING ============
function switchTab(tabName, clickedItem = null) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.toggle('active', tab.id === tabName + '-tab'));

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    const targetItem = clickedItem || document.querySelector('.nav-item[data-tab="' + tabName + '"]');
    if (targetItem) {
        targetItem.classList.add('active');
    }
}

// ============ DATASET UPLOAD HANDLING ============
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const zone = document.getElementById('uploadZone');
        zone.innerHTML = `
            <p>✓ File selected: <strong>${file.name}</strong></p>
            <p class="file-info">Size: ${formatFileSize(file.size)}</p>
        `;
    }
}

function handleUpload(event) {
    event.preventDefault();

    // Get form data
    const datasetType = document.getElementById('datasetType').value;
    const fileName = document.getElementById('fileName').value;
    const fileFormat = document.getElementById('fileFormat').value;
    const description = document.getElementById('fileDescription').value;
    const vectorize = document.getElementById('vectorizeCheckbox').checked;

    // Validate
    if (!datasetType || !fileName || !fileFormat) {
        alert('Please fill in all required fields');
        return;
    }

    // Create new row for table
    const newRow = `
        <tr>
            <td><strong>${fileName}</strong></td>
            <td>${capitalizeFirst(datasetType)}</td>
            <td>${fileFormat.toUpperCase()}</td>
            <td>${Math.floor(Math.random() * 10000 + 100)}</td>
            <td>${new Date().toISOString().split('T')[0]}</td>
            <td><span class="status-badge processing">⏳ Processing</span></td>
            <td>
                <button class="table-btn edit" title="Edit">✏️</button>
                <button class="table-btn delete" onclick="deleteDataset(this)" title="Delete">🗑️</button>
            </td>
        </tr>
    `;

    // Add to table
    document.getElementById('datasetsTable').innerHTML += newRow;

    // Show success modal
    showUploadSuccess(fileName, vectorize);

    // Reset form
    event.target.reset();
    document.getElementById('uploadZone').innerHTML = `
        <p>Drag & drop file here or <a href="#" onclick="document.getElementById('fileInput').click(); return false;">click to browse</a></p>
        <p class="file-info">Supported: CSV, JSON, PDF, Markdown (Max 50MB)</p>
    `;
}

function showUploadSuccess(fileName, willVectorize) {
    const modal = document.getElementById('uploadModal');
    const message = document.getElementById('uploadMessage');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    message.textContent = `"${fileName}" has been uploaded and is now being ${willVectorize ? 'vectorized' : 'processed'}.`;
    
    modal.classList.add('show');

    // Animate progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.floor(progress) + '%';

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                progressText.textContent = '✓ Complete!';
            }, 500);
        }
    }, 300);
}

function closeUploadModal() {
    document.getElementById('uploadModal').classList.remove('show');
}

// ============ DATASET MANAGEMENT ============
function deleteDataset(button) {
    if (confirm('Are you sure you want to delete this dataset?')) {
        button.closest('tr').remove();
        alert('Dataset deleted successfully');
    }
}

// ============ KNOWLEDGE BASE TESTING ============
function testQuery() {
    const query = document.getElementById('testQuery').value.trim();
    const resultsDiv = document.getElementById('queryResults');

    if (!query) {
        alert('Please enter a query');
        return;
    }

    // Show loading
    resultsDiv.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">🔍 Searching knowledge base...</p>';

    // Simulate search
    setTimeout(() => {
        const mockResults = [
            {
                source: 'FAQs - Returns & Refunds',
                excerpt: 'Our return policy allows returns within 24 hours of delivery. Damaged items receive instant refunds or replacements.',
                relevance: '95%'
            },
            {
                source: 'Policies - Damage Claims',
                excerpt: 'We approve 99% of damage claims within 5 minutes. Please provide photo evidence of the damage.',
                relevance: '88%'
            },
            {
                source: 'Product Catalog',
                excerpt: 'Alternative products available if the requested item is out of stock.',
                relevance: '72%'
            }
        ];

        let html = '<div style="display: flex; flex-direction: column; gap: 12px;">';
        mockResults.forEach(result => {
            html += `
                <div style="background-color: var(--bg-dark); padding: 12px; border-radius: 6px; border-left: 3px solid var(--primary);">
                    <p style="margin: 0 0 8px 0; font-weight: 600; color: var(--primary);">${result.source}</p>
                    <p style="margin: 0 0 8px 0; font-size: 13px; line-height: 1.4;">${result.excerpt}</p>
                    <p style="margin: 0; font-size: 12px; color: var(--text-secondary);">Relevance: ${result.relevance}</p>
                </div>
            `;
        });
        html += '</div>';

        resultsDiv.innerHTML = html;
    }, 1500);
}

// ============ CHAT LOGS ============
function viewChatLog(button) {
    const row = button.closest('tr');
    const chatId = row.cells[0].textContent;
    alert(`Viewing chat log: ${chatId}\n\nIn production, this would open a detailed chat transcript viewer.`);
}

// ============ SETTINGS ============
function saveSettings() {
    alert('Settings saved successfully!');
}

// ============ ADMIN FUNCTIONS ============
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}

// ============ UTILITY FUNCTIONS ============
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============ FILE UPLOAD DRAG & DROP ============
const uploadZone = document.getElementById('uploadZone');

if (uploadZone) {
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadZone.style.borderColor = 'var(--primary)';
        uploadZone.style.backgroundColor = 'rgba(255, 214, 10, 0.05)';
    });

    uploadZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadZone.style.borderColor = 'var(--border)';
        uploadZone.style.backgroundColor = 'var(--bg-dark)';
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        uploadZone.style.borderColor = 'var(--border)';
        uploadZone.style.backgroundColor = 'var(--bg-dark)';

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            document.getElementById('fileInput').files = files;
            handleFileSelect({ target: { files: files } });
        }
    });

    uploadZone.addEventListener('click', () => {
        document.getElementById('fileInput').click();
    });
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    // Set first tab as active
    const firstTab = document.querySelector('.tab-content');
    if (firstTab) {
        firstTab.classList.add('active');
    }

    // Add click handlers to nav items
    document.querySelectorAll('.nav-item').forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tabNames = ['uploads', 'knowledge', 'chat-logs', 'settings', 'analytics'];
            if (index < tabNames.length) {
                switchTab(tabNames[index], item);
            }
        });
    });

    // Make first nav item active
    document.querySelector('.nav-item').classList.add('active');
});
