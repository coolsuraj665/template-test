 const QuoteContainer = document.getElementById('quote-container');
 const quoteText = document.getElementById('quote');
 const authorText = document.getElementById('author');
 const twitterBtn = document.getElementById('twitter');
 const newQuoteBtn = document.getElementById('new-quote');
 const loader = document.getElementById('loader');

 //show loading 
 function loading() {
     loader.hidden = false;
     QuoteContainer.hidden = true;
 }

 // hide loading

 function complete() {
     QuoteContainer.hidden = false;
     loader.hidden = true;
 }

 let apiQuotes = [];

 function newQuote() {
     loading();
     //pick a random quote from apiQuotes
     const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
     //check if author is blank and replace it with 'Unknown'
     if (!quote.author) {
         authorText.textContent = 'Unknown';
     } else {
         authorText.textContent = quote.author;
     }
     //check Quote length to determine styling
     if (quote.text.length > 120) {
         quoteText.classList.add('long-quote');
     } else {
         quoteText.classList.remove('long-quote');
     }

     quoteText.textContent = quote.text;
     complete();
 }

 // function newQuote() {
 //     //pick a random quote from apiQuotes
 //     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
 //     console.log(quote);
 // }

 //  Get Quotes from API
 async function getQuotes() {
     const apiUrl = 'https://type.fit/api/quotes';
     try {
         const response = await fetch(apiUrl);
         apiQuotes = await response.json();
         newQuote();
     } catch (error) {
         //catch error here
     }
 }

 //tweet quote

 function tweetQuote() {
     const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
     window.open(twitterUrl, '_blank')
 }

 newQuoteBtn.addEventListener('click', newQuote);
 twitterBtn.addEventListener('click', tweetQuote);
 // on load

 getQuotes()
     //  loading();
     // newQuote();