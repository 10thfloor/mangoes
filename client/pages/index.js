import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import withData from '../lib/withData';

export default withData(props => (
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
));
