document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ['content.js']
      },
      () => {
        chrome.runtime.onMessage.addListener((message) => {
          const techStackDiv = document.getElementById('tech-stack');
          techStackDiv.innerHTML = '';

          if (Object.keys(message.techStack).length === 0) {
            techStackDiv.innerHTML = 'No tech stack identified.';
          } else {
            for (const [tech, version] of Object.entries(message.techStack)) {
              const techInfo = document.createElement('div');
              techInfo.textContent = `${tech}: ${version}`;
              techStackDiv.appendChild(techInfo);
            }
          }
        });
      }
    );
  });
});
