document.addEventListener("DOMContentLoaded", async (e) => {
  const quoteButton = document.querySelector("#quoteButton");
  const quoteDiv = document.querySelector(".quoteDiv");
  const sourceDiv = document.querySelector(".sourceDiv");
  const quotes = [
    {
      quote: "Your excuses are longer than my hair. Get up. And get after it.",
      source: "-Matthew Mores",
    },
    {
      quote:
        "I don't ask questions all day so you can sit in bed all day. Get up and get after it.",
      source: "-Cody Brown",
    },
    {
      quote: "Don't forget to check-in...to buff town",
      source: "-Warren Tamagri ",
    },
    {
      quote: "Make all day an EOD pep talk",
      source: "-Torrell Kennedy",
    },
    {
      quote: "I don't push my deadlines, I push my LIMITS",
      source: "-Justin Sung",
    },
    {
      quote: "Release your inner fox",
      source: "-Ed Herman",
    },
    {
      quote: "It's time to sequilize that body.",
      source: "-Alec Keeler",
    },
  ];

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  quoteButton.addEventListener("click", (e) => {
    const randomNum = getRandomInt(0, quotes.length - 1);
    quoteDiv.innerHTML = quotes[randomNum].quote;
    sourceDiv.innerHTML = quotes[randomNum].source;
    quoteDiv.style.display = "inline";
    sourceDiv.style.display = "inline";
  });
});
