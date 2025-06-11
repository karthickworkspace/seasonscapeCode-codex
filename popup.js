// popup.js

const STORAGE_KEY = 'seasonEffect';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button[data-season]').forEach(btn => {
    btn.addEventListener('click', () => applySeason(btn.dataset.season));
  });
  const clearBtn = document.getElementById('clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearEffects);
  }
});

async function applySeason(season) {
  try {
    await chrome.storage.local.set({ [STORAGE_KEY]: season });
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.url.startsWith('http')) return;
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: [`seasons/${season}.js`]
    });
  } catch (err) {
    console.error('Error applying season:', err);
  }
}

async function clearEffects() {
  try {
    await chrome.storage.local.remove(STORAGE_KEY);
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.url.startsWith('http')) return;
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const el = document.getElementById('season-container');
        if (el) el.remove();
      }
    });
  } catch (err) {
    console.error('Error clearing effects:', err);
  }
}
