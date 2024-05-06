document.getElementById('download-button').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        console.error('No active tab found');
        return;
      }
  
      const tabId = tabs[0].id;
  
      chrome.tabs.executeScript(tabId, {
        code: 'document.documentElement.outerHTML'
      }, (result) => {
        const html = result[0];
        const blob = new Blob([html], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'page_data.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
    });
  });