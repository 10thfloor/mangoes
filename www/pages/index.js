import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import withData from '../lib/withData';

<<<<<<< HEAD
import * as blockstack from 'blockstack';

export default withData(props => {
  if (process.browser) {
    // blockstack.redirectToSignIn();
=======
if (process.browser) {
  window.blockstack = require('blockstack');
}

export default withData(props => {
  if (process.browser) {
    console.log(window.blockstack);
>>>>>>> Changes.
  }

  return (
    <Query
      query={gql`
        {
          contracts: ping(who: "contracts")
          ipfs: ping(who: "ipfs")
          prisma: ping(who: "prisma")
        }
      `}
    >
      {({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>}
    </Query>
  );
});
