document.querySelector('.button').addEventListener('click', function() {
    var searchTerm = document.querySelector('.form-control').value;
    var inputFeedback = document.getElementById('input-feedback');
  
    // Check if the search term is empty
    if (searchTerm.trim() === '') {
      inputFeedback.textContent = 'Please enter a valid search term.';
      inputFeedback.style.color = 'black';
      return; 
    }
    inputFeedback.textContent = '';
    inputFeedback.style.color = ''; 
  
    // Fetch data from the Tenor API
    fetch(`https://api.tenor.com/v1/search?q=${searchTerm}&key=LIVDSRZULELA&limit=8`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('API Response:', data);

        var resultContainer = document.getElementById('result');
        resultContainer.innerHTML = '';
        if (data.results.length === 0) {
          // Display a message for empty results
          var errorMessage = document.createElement('div');
          errorMessage.textContent = 'No results found. Please enter a valid request.';
          resultContainer.appendChild(errorMessage);
        } else {
          // Display each GIF on the page
          data.results.forEach(result => {
            var gifUrl = result.media[0].gif.url;
            var gifContainer = document.createElement('div');
            var gifImage = document.createElement('img');
            gifImage.src = gifUrl;
            gifContainer.appendChild(gifImage);
            resultContainer.appendChild(gifContainer);
          });
        }
      })
    
  });
  
  