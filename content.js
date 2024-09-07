console.log("script injected");

(function() {
  const techStack = {};

  // check jquery
    if (typeof jQuery != 'undefined') {
      techStack.jQuery = 'detected';
      console.log('jQuery is present');
    } else {
      console.log('jQuery is not present');
    }

  // Check for HTML
  if (document.doctype) {
    techStack.HTML = document.doctype.name;
    console.log('HTML found:', techStack.HTML);
  } else {
    console.log('HTML not found');
  }

  // Check for CSS
  const stylesheets = document.styleSheets;
  if (stylesheets.length > 0) {
    techStack.CSS = 'Detected';
    console.log('CSS found');
  } else {
    console.log('CSS not found');
  }

  // Check for JavaScript
  const scripts = document.scripts;
  if (scripts.length > 0) {
    techStack.JavaScript = 'Detected';
    console.log('JavaScript found');
  } else {
    console.log('JavaScript not found');
  }

 //check React
  (function() {
    const hasReactFiber = !!(window.__REACT_DEVTOOLS_GLOBAL_HOOK__ && window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers && Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length > 0);
    const hasReactContainer = !!document.querySelector('[data-reactroot], [data-reactid]');
    const hasReactGlobal = typeof React !== 'undefined' || typeof ReactDOM !== 'undefined';
    if (hasReactFiber || hasReactContainer || hasReactGlobal) {
      techStack.React = 'detected';
        console.log("React is detected on this website!");
    } else {
        console.log("React is not detected on this website.");
    }
  })();


  //check Angular
  (function() {
    const isAngularJS = typeof angular !== 'undefined' && angular.version;
    const isAngular2Plus = document.querySelector('[ng-version]') !== null;
    
    if (isAngularJS) {
        techStack.Angular = 'detected with version ' + angular.version.full;
        console.log("AngularJS is detected! Version:", angular.version.full);
    } else if (isAngular2Plus) {
        let ver = document.querySelector('[ng-version]').getAttribute('ng-version');
        techStack.Angular = 'detected with version ' + ver;
        console.log("Angular (2+) is detected! Version:", );
    } else {
        console.log("Angular is not detected.");
    }
  })();
  
// check bootstarp
(function() {
  const bootstrapCSS = Array.from(document.querySelectorAll('link')).find(link => link.href.includes('bootstrap.min.css'));
  const bootstrapJS = Array.from(document.querySelectorAll('script')).find(script => script.src.includes('bootstrap.min.js'));
  
  if (bootstrapCSS) {
      techStack.Bootstrap = 'CSS detected';
      console.log("Bootstrap CSS is detected!");
  } else if (bootstrapJS) {
      techStack.Bootstrap = 'JS detected';
      console.log("Bootstrap JS is detected!");
  } else {
      console.log("Bootstrap is not detected.");
  }
})();

//check Google fonts
(function() {
  const googleFontsLink = Array.from(document.querySelectorAll('link')).find(link => link.href.includes('fonts.googleapis.com'));
  const googleFontsScript = Array.from(document.querySelectorAll('script')).find(script => script.src.includes('fonts.googleapis.com'));
  if (googleFontsLink) {
      techStack.GoogleFonts = 'detected via <link>';
      console.log("Google Fonts detected via <link> tag:", googleFontsLink.href);
  } else if (googleFontsScript) {
      techStack.GoogleFonts = 'detected via JavaScript';
      console.log("Google Fonts detected via JavaScript:", googleFontsScript.src);
  } else {
      console.log("Google Fonts are not detected.");
  }
})();

// check php
(function() {
  const phpOpeningTags = document.documentElement.outerHTML.includes('<?php') || document.documentElement.outerHTML.includes('<?');
  const phpInURL = window.location.href.includes('.php');
  const phpSessID = document.cookie.includes('PHPSESSID');
  
  if (phpOpeningTags) {
      techStack.PHP = 'detected via PHP opening tags';
      console.log("PHP is detected via '<?php' tags in the HTML!");
  } else if (phpInURL) {
      techStack.PHP = 'detected via .php extension in URL';
      console.log("PHP is detected via '.php' extension in the URL!");
  } else if (phpSessID) {
      techStack.PHP = 'detected via PHPSESSID cookie';
      console.log("PHP is detected via 'PHPSESSID' cookie!");
  } else {
      console.log("PHP is not detected.");
  }
})();


  // Send the tech stack information to the background script
  chrome.runtime.sendMessage({ techStack: techStack });
})();

