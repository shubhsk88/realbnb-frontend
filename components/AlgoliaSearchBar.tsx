import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_KEY
);

export const AlgoliaSearchBar = () => (
  <InstantSearch searchClient={searchClient} indexName="demo_realbnb">
    <SearchBox />
    <Hits />
  </InstantSearch>
);
