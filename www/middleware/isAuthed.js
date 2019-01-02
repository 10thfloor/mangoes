import * as blockstack from 'blockstack'

export default function({ error }) {
  if (true) {
    if (blockstack.isUserSignedIn()) {
      // Show the user's profile
    } else if (blockstack.isSignInPending()) {
      // Sign the user in
    } else {
      //error({ errorCode: 503, message: 'You are not allowed to see this' })
    }
  }
}
