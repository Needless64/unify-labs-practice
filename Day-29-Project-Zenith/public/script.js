// Twitter-like Microblogging Platform

// State Management
let currentView = 'home';
let currentTweetId = null;
let isEditMode = false;

// DOM Elements
const homeView = document.getElementById('homeView');
const profileView = document.getElementById('profileView');
const postView = document.getElementById('postView');
const feedContainer = document.getElementById('feedContainer');
const profileFeed = document.getElementById('profileFeed');
const loadingOverlay = document.getElementById('loadingOverlay');
const editModal = document.getElementById('editModal');

// Composer Elements
const tweetInput = document.getElementById('tweetInput');
const charCount = document.getElementById('charCount');
const postBtn = document.getElementById('postBtn');

// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const backBtn = document.getElementById('backBtn');
const backToFeedBtn = document.getElementById('backToFeedBtn');

// Edit Modal Elements
const editInput = document.getElementById('editInput');
const editCharCount = document.getElementById('editCharCount');
const saveEditBtn = document.getElementById('saveEditBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const modalClose = document.querySelector('.modal-close');

// Utility Functions
function showLoading() {
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

function showView(view) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    navLinks.forEach(item => item.classList.remove('active'));
    
    if (view === 'home') {
        homeView.classList.add('active');
        document.querySelector('[data-view="home"]').classList.add('active');
        currentView = 'home';
    } else if (view === 'profile') {
        profileView.classList.add('active');
        document.querySelector('[data-view="profile"]').classList.add('active');
        currentView = 'profile';
        loadProfileTweets();
    } else if (view === 'post') {
        postView.classList.add('active');
        currentView = 'post';
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${type === 'success' ? '#1DA1F2' : '#E0245E'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function formatTimeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
    
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Character Counter
function updateCharCount(input, countElement) {
    const count = input.value.length;
    countElement.textContent = count;
    
    if (count > 260) {
        countElement.parentElement.classList.add('warning');
    } else {
        countElement.parentElement.classList.remove('warning');
    }
    
    if (count > 280) {
        countElement.parentElement.classList.add('danger');
    } else {
        countElement.parentElement.classList.remove('danger');
    }
    
    return count;
}

tweetInput.addEventListener('input', () => {
    const count = updateCharCount(tweetInput, charCount);
    postBtn.disabled = count === 0 || count > 280;
});

editInput.addEventListener('input', () => {
    updateCharCount(editInput, editCharCount);
});

// API Functions
async function fetchTweets() {
    console.log('fetchTweets called');
    try {
        showLoading();
        console.log('Fetching from /api/posts...');
        const response = await fetch('/api/posts?published=true');
        console.log('Response status:', response.status);
        const tweets = await response.json();
        console.log('Tweets received:', tweets);
        renderTweets(tweets, feedContainer);
        updatePostCount(tweets.length);
    } catch (error) {
        console.error('Error fetching tweets:', error);
        showNotification('Failed to load posts', 'error');
    } finally {
        hideLoading();
    }
}

async function loadProfileTweets() {
    try {
        showLoading();
        const response = await fetch('/api/posts?published=true');
        const tweets = await response.json();
        renderTweets(tweets, profileFeed);
    } catch (error) {
        showNotification('Failed to load profile posts', 'error');
    } finally {
        hideLoading();
    }
}

async function fetchTweet(id) {
    try {
        showLoading();
        const response = await fetch(`/api/posts/${id}`);
        const tweet = await response.json();
        renderSingleTweet(tweet);
    } catch (error) {
        showNotification('Failed to load post', 'error');
    } finally {
        hideLoading();
    }
}

async function createTweet(content) {
    try {
        showLoading();
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: content.substring(0, 50),
                content: content,
                author: 'zenith_user',
                tags: [],
                published: true
            })
        });
        
        if (response.ok) {
            showNotification('Posted!');
            tweetInput.value = '';
            charCount.textContent = '0';
            postBtn.disabled = true;
            fetchTweets();
        } else {
            throw new Error('Failed to create post');
        }
    } catch (error) {
        showNotification('Failed to post', 'error');
    } finally {
        hideLoading();
    }
}

async function updateTweet(id, content) {
    try {
        showLoading();
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: content,
                title: content.substring(0, 50)
            })
        });
        
        if (response.ok) {
            showNotification('Post updated!');
            editModal.classList.remove('active');
            if (currentView === 'post') {
                fetchTweet(id);
            } else {
                fetchTweets();
            }
        } else {
            throw new Error('Failed to update post');
        }
    } catch (error) {
        showNotification('Failed to update post', 'error');
    } finally {
        hideLoading();
    }
}

async function deleteTweet(id) {
    if (!confirm('Delete this post?')) {
        return;
    }
    
    try {
        showLoading();
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showNotification('Post deleted');
            showView('home');
            fetchTweets();
        } else {
            throw new Error('Failed to delete post');
        }
    } catch (error) {
        showNotification('Failed to delete post', 'error');
    } finally {
        hideLoading();
    }
}

// Render Functions
function renderTweets(tweets, container) {
    console.log('renderTweets called with:', tweets.length, 'tweets');
    console.log('Container:', container);
    
    if (tweets.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No posts yet</h3>
                <p>Be the first to post something!</p>
            </div>
        `;
        return;
    }
    
    const html = tweets.map(tweet => {
        const timeAgo = formatTimeAgo(tweet.created_at);
        
        return `
            <div class="post-card glass" data-id="${tweet.id}">
                <div class="post-header">
                    <div class="post-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="post-info">
                        <div>
                            <span class="post-author">${tweet.author}</span>
                            <span class="post-handle">@${tweet.author.toLowerCase().replace(/\s+/g, '_')}</span>
                            <span> · </span>
                            <span class="post-time">${timeAgo}</span>
                        </div>
                    </div>
                </div>
                <div class="post-content">${tweet.content}</div>
                <div class="post-actions">
                    <button class="action-btn" onclick="event.stopPropagation()">
                        <i class="far fa-comment"></i>
                    </button>
                    <button class="action-btn" onclick="event.stopPropagation()">
                        <i class="fas fa-retweet"></i>
                    </button>
                    <button class="action-btn" onclick="event.stopPropagation()">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="action-btn" onclick="event.stopPropagation()">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    console.log('Generated HTML length:', html.length);
    container.innerHTML = html;
    console.log('HTML set to container');
    
    // Add click listeners to posts with double-tap to edit
    const postCards = container.querySelectorAll('.post-card');
    console.log('Found post cards:', postCards.length);
    
    postCards.forEach(postEl => {
        let lastTap = 0;
        let tapTimeout = null;
        
        postEl.addEventListener('click', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            
            // Clear any pending single-tap action
            if (tapTimeout) {
                clearTimeout(tapTimeout);
                tapTimeout = null;
            }
            
            // Double tap detected (within 300ms)
            if (tapLength < 300 && tapLength > 0) {
                console.log('Double tap detected! Opening edit modal');
                e.preventDefault();
                e.stopPropagation();
                const postId = postEl.dataset.id;
                const content = postEl.querySelector('.post-content').textContent;
                openEditModal(postId, content);
                lastTap = 0; // Reset
            } else {
                // Single tap - delay to check if it's a double tap
                console.log('Potential single tap detected');
                lastTap = currentTime;
                
                tapTimeout = setTimeout(() => {
                    console.log('Confirmed single tap - viewing post', postEl.dataset.id);
                    const postId = postEl.dataset.id;
                    currentTweetId = postId;
                    fetchTweet(postId);
                    showView('post');
                }, 300);
            }
        });
    });
}

function renderSingleTweet(tweet) {
    const date = new Date(tweet.created_at).toLocaleDateString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    
    document.getElementById('singlePostContainer').innerHTML = `
        <div class="post-card glass" style="cursor: default;">
            <div class="post-header">
                <div class="post-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="post-info">
                    <div>
                        <span class="post-author">${tweet.author}</span>
                        <span class="post-handle">@${tweet.author.toLowerCase().replace(/\s+/g, '_')}</span>
                    </div>
                </div>
            </div>
            <div class="post-content" style="font-size: 20px; margin: 20px 0;">${tweet.content}</div>
            <div style="color: var(--text-tertiary); font-size: 14px; margin: 16px 0; padding: 16px 0; border-top: 1px solid var(--glass-border);">
                ${date}
            </div>
            <div class="post-actions" style="padding: 16px 0; border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);">
                <button class="action-btn">
                    <i class="far fa-comment"></i>
                </button>
                <button class="action-btn">
                    <i class="fas fa-retweet"></i>
                </button>
                <button class="action-btn">
                    <i class="far fa-heart"></i>
                </button>
                <button class="action-btn">
                    <i class="fas fa-share"></i>
                </button>
            </div>
            <div style="display: flex; gap: 12px; padding: 16px 0;">
                <button class="btn-secondary glass" onclick="openEditModal('${tweet.id}', \`${tweet.content.replace(/`/g, '\\`')}\`)">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-secondary glass" style="color: var(--neon-pink);" onclick="deleteTweet('${tweet.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `;
}

function updatePostCount(count) {
    const postsCountEl = document.getElementById('postsCount');
    if (postsCountEl) {
        postsCountEl.textContent = count;
    }
}

// Edit Modal Functions
function openEditModal(id, content) {
    currentTweetId = id;
    editInput.value = content;
    updateCharCount(editInput, editCharCount);
    editModal.classList.add('active');
}

function closeEditModal() {
    editModal.classList.remove('active');
    editInput.value = '';
    currentTweetId = null;
}

// Event Listeners
postBtn.addEventListener('click', () => {
    const content = tweetInput.value.trim();
    if (content && content.length <= 280) {
        createTweet(content);
    }
});

// Allow Enter to post (Ctrl+Enter or Cmd+Enter)
tweetInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (!postBtn.disabled) {
            postBtn.click();
        }
    }
});

navLinks.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.dataset.view;
        if (view) {
            showView(view);
        }
    });
});

if (backBtn) {
    backBtn.addEventListener('click', () => {
        showView('home');
    });
}

if (backToFeedBtn) {
    backToFeedBtn.addEventListener('click', () => {
        showView('home');
    });
}

saveEditBtn.addEventListener('click', () => {
    const content = editInput.value.trim();
    if (content && content.length <= 280 && currentTweetId) {
        updateTweet(currentTweetId, content);
    }
});

cancelEditBtn.addEventListener('click', closeEditModal);
modalClose.addEventListener('click', closeEditModal);

// Close modal on outside click
editModal.addEventListener('click', (e) => {
    if (e.target === editModal) {
        closeEditModal();
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Make functions globally available
window.openEditModal = openEditModal;
window.deleteTweet = deleteTweet;

// Initialize app
console.log('Initializing app...');
console.log('feedContainer:', feedContainer);
console.log('tweetInput:', tweetInput);
console.log('postBtn:', postBtn);
fetchTweets();
