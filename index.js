document.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'r' && e.ctrlKey) {
        e.preventDefault();
    }
});

document.addEventListener("click", () => {
    document.body.focus();
});

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === '`') {
        event.preventDefault();
        const choice = prompt("Choose an option:\n[1] Write inline code.\n[2] Upload userscript file.\n[3] Import userscript from URL.");
        
        if (choice === '1') {
            const inlineCode = prompt("Enter your inline code:");
            alert("You entered: " + inlineCode);
            eval(inlineCode)
        } else if (choice === '2') {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.js, .jsx, .ts, .tsx, es, es6, cjs, sjs';
            fileInput.onchange = function(event) {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = function(e) {
                    const code = e.target.result;
                    alert("You uploaded the following code:\n" + code);
                    try {
                        eval(code);
                    } catch (error) {
                        alert("Error executing code:\n" + error);
                    }
                };
                reader.readAsText(file);
            };
            fileInput.click();
        } else if (choice === '3') {
            const scriptURL = prompt("Enter the userscript URL:");
            alert("You will import the script from: " + scriptURL);
            
            fetch(scriptURL)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.statusText);
                    }
                    return response.text();
                })
                .then(code => {
                    alert("You uploaded the following code:\n" + code);
                    try {
                        eval(code);
                    } catch (error) {
                        alert("Error executing code:\n" + error);
                    }
                })
                .catch(error => {
                    alert("Failed to fetch the script:\n" + error);
                });
            
        } else {
            alert("Invalid option. Please choose 1, 2, or 3.");
        }
    }
});
