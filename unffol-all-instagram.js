// RUN WITH GOOGLE CHROME
// 1. OPEN INSTAGRAM
// 2. CLICK ON "FOLLOWING" ON YOUR INSTAGRAM PROFILE
// 3. OPEN DEVELOPER TOOLS BY RIGHT CLICKING ON PAGE AND CLICKING "INSPECT"
// 4. COPY FOLLOWING CODE AND PASTE IN DEVELOPER TOOLS CONSOLE AND RUN
// 5. SCRIPT WILL NOT RUN IF TAB IS NAVIGATED AWAY FROM, MINIMIZED OR UNFOCUSED
// IT IS RECOMMENDED TO OPEN A NEW CHROME WINDOW OR PUSH TAB TO THE SIDE AND LET SCRIPT RUN IN BACKGROUND

// SCRIPT WILL CLICK ON "FOLLOWING" BUTTON AND THEN CLICK "UNFOLLOW" WHEN ASKED TO CONFIRM THE ACTION
// AND FINALLY WILL SCROLL THE NEXT "FOLLOWING" BUTTON INTO VIEW

const FOLLOWING_BUTTON_TEXT = 'Following' // CHANGE "FOLLOWING" TO LOCALIZED LANGUAGE AS DISPLAYED ON INSTAGRAM
const UNFOLLOW_BUTTON_TEXT = 'Unfollow' // CHANGE "UNFOLLOW" TO LOCALIZED LANGUAGE AS DISPLAYED ON INSTAGRAM
const MAX_ATTEMPTS_PER_UNFOLLOW = 3 // MAXIMUM # OF ATTEMPTS

const unfollowSomebody = () => {
    const followingButton = document
        .evaluate(`//button[text()="${FOLLOWING_BUTTON_TEXT}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue
    if (followingButton) {
        console.log('Found following button. Clicking ...')
        followingButton.click()
        console.log('Clicked following button.')
        let unfollowButton = document.evaluate(`//button[text()="${UNFOLLOW_BUTTON_TEXT}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
        let attempts = 1
        while (attempts < MAX_ATTEMPTS_PER_UNFOLLOW && !unfollowButton) {
            console.log(`Attempted to find unfollowButton but could not. Retry #${attempts++}`)
            unfollowButton = document.evaluate(`//button[text()="${UNFOLLOW_BUTTON_TEXT}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
        }
        if (attempts < MAX_ATTEMPTS_PER_UNFOLLOW) {
            console.log('Found unfollow button. Scrolling and clicking ...')
            unfollowButton.scrollIntoView(true)
            unfollowButton.click()
        } else {
            console.log(`Retried ${MAX_ATTEMPTS_PER_UNFOLLOW} times and didn't succeed`)
        }
        return false
    }
    return true
}

const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// INCREASE TIMEOUT IF NECESSARY TO AVOID RESTRICTIONS/LIMITS PER DAY
const randomTimeout = () => (Math.floor((Math.random() * 10) + 1) * 1000) + 60000

const unfollowEveryone = async () => {
    let shouldStop = false
    while (!shouldStop) {
        shouldStop = unfollowSomebody()
        const unfollowTimeout = randomTimeout()
        console.log(`Waiting ${unfollowTimeout} seconds. Should stop: ${shouldStop}.`)
        await timeout(unfollowTimeout)
    }
    console.log('You follow no one.')
}

unfollowEveryone()
