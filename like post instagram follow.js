// RUN WITH GOOGLE CHROME
// 1. OPEN INSTAGRAM
// 2. SEARCH FOR A HASHTAG
// 3. CLICK ON PHOTO TO REVEAL LIKE BUTTON AS WELL AS ARROWS FOR NAVIGATING BETWEEN PHOTOS
// 4. OPEN DEVELOPER TOOLS BY RIGHT CLICKING ON PAGE AND CLICKING "INSPECT"
// 5. COPY FOLLOWING CODE AND PASTE IN DEVELOPER TOOLS CONSOLE AND RUN
// 6. SCRIPT WILL NOT RUN IF TAB IS NAVIGATED AWAY FROM, MINIMIZED OR UNFOCUSED
// IT IS RECOMMENDED TO OPEN A NEW CHROME WINDOW OR PUSH TAB TO THE SIDE AND LET SCRIPT RUN IN BACKGROUND

// SCRIPT WILL CLICK ON "LIKE" BUTTON AND THEN NAVIGATE TO THE FOLLOWING POST

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// INCREASE TIMEOUT IF NECESSARY TO AVOID RESTRICTIONS/LIMITS PER DAY
const randomTimeout = () => (Math.floor((Math.random() * 10) + 1) * 1000) + 60000

const likeAndClick = async () => {
  // GET LIKE BUTTON
  var firstLike = document.querySelector(
    'section.ltpMr.Slqrh > span.fr66n > button > div > span > svg[aria-label="Like"]'
  );
  if (firstLike) {
    // SCROLL LIKE BUTTON INTO VIEW
    firstLike.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
    var closestElement = firstLike.closest("button");
    console.log("clicked...\n");
    closestElement.click();
  }

  await timeout(1000);
  // CLICK PAGINATION ARROW
  var nextArrow = document.getElementsByClassName(
    "coreSpriteRightPaginationArrow"
  )[0];
  nextArrow.click();
};

const likePosts = async () => {
  let shouldStop = false;
  while (true) {
    likeAndClick();
    const followTimeout = randomTimeout();
    console.log(`Waiting ${followTimeout} seconds.`);
    await timeout(followTimeout);
  }
};

likePosts();
