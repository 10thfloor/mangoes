import { withData } from 'next-apollo';
import { HttpLink } from 'apollo-link-http';
import {
  InMemoryCache,
  // IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';

// import introspectionQueryResultData from './fragmentTypes';

const createCache = () => {
  // const fragmentMatcher = new IntrospectionFragmentMatcher({
  //   introspectionQueryResultData,
  // });

  return new InMemoryCache(/*{ fragmentMatcher }*/);
};

const config = {
  link: new HttpLink({
    uri: 'http://localhost:4000/api',
  }),
  cache: createCache(),
};

export default withData(config);
