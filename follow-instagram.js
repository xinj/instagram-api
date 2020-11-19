// RUN WITH GOOGLE CHROME
// 1. OPEN INSTAGRAM
// 2. CLICK ON "FOLLOWERS" OR "FOLLOWING" ON A DESIRED USER'S PROFILE
// 3. OPEN DEVELOPER TOOLS BY RIGHT CLICKING ON PAGE AND CLICKING "INSPECT"
// 4. COPY FOLLOWING CODE AND PASTE IN DEVELOPER TOOLS CONSOLE AND RUN
// 5. SCRIPT WILL NOT RUN IF TAB IS NAVIGATED AWAY FROM, MINIMIZED OR UNFOCUSED
// IT IS RECOMMENDED TO OPEN A NEW CHROME WINDOW OR PUSH TAB TO THE SIDE AND LET SCRIPT RUN IN BACKGROUND

// SCRIPT WILL CLICK ON "FOLLOW" BUTTON AND THEN SCROLL THE NEXT "FOLLOW" BUTTON INTO VIEW

const FOLLOW_BUTTON_TEXT = 'Follow' // CHANGE "FOLLOW" TO LOCALIZED LANGUAGE AS DISPLAYED ON INSTAGRAM
const MAX_ATTEMPTS_PER_FOLLOW = 3 // MAXIMUM # OF ATTEMPTS

const followSomebody = () => {
    const followButton = document
        .evaluate(`//button[text()="${FOLLOW_BUTTON_TEXT}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue
    if (followButton) {
        let attempts = 1
        while (attempts < MAX_ATTEMPTS_PER_FOLLOW && !followButton) {
            console.log(`Attempted to find followButton but could not. Retry #${attempts++}`)
            followButton = document.evaluate(`//button[text()="${FOLLOW_BUTTON_TEXT}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
        }
        if (attempts < MAX_ATTEMPTS_PER_FOLLOW) {
            console.log('Found follow button. Scrolling and clicking ...')
            followButton.scrollIntoView(true)
            followButton.click()
        } else {
            console.log(`Retried ${MAX_ATTEMPTS_PER_FOLLOW} times and didn't succeed`)
        }
        return false
    }
    return true
}

const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// INCREASE TIMEOUT IF NECESSARY TO AVOID RESTRICTIONS/LIMITS PER DAY
const randomTimeout = () => (Math.floor((Math.random() * 10) + 1) * 1000) + 60000

const followEveryone = async () => {
    let shouldStop = false
    while (!shouldStop) {
        shouldStop = followSomebody()
        const followTimeout = randomTimeout()
        console.log(`Waiting ${followTimeout} seconds. Should stop: ${shouldStop}.`)
        await timeout(followTimeout)
    }
    console.log('You cannot follow anymore.')
}

followEveryone()
