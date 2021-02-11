/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { ReactElement, useEffect, useState } from "react";
import router from "next/router";
import styled from "@emotion/styled";

import algoliasearch from "algoliasearch/lite";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  BoxProps,
  Box,
} from "@chakra-ui/react";
import {
  InstantSearch,
  Hits,
  Configure,
  connectStateResults,
} from "react-instantsearch-dom";

import { AlgoliaSearchBox } from "./SearchBox";
import { Hit } from "./Hit";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_KEY
);

export const AlgoliaSearch = (props: BoxProps): ReactElement => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputFocus = (e) => {
    if (e.currentTarget.value.length > 0) {
      setIsInputFocused(true);
      setIsOpen(true);
    }
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleBlur = () => {
    if (!isInputFocused) {
      setIsOpen(false);
    }
  };

  const handleInputChange = (e) => {
    if (!isOpen && e.currentTarget.value.length > 0) {
      setIsOpen(true);
    } else if (isOpen && e.currentTarget.value.length <= 0) {
      setIsOpen(false);
    }
  };

  // TODO: block search when route change is in process?
  // may cause edge cases/confusion, loading event instead?
  useEffect(() => {
    const handleRouteChange = () => {
      if (isOpen) setIsOpen(false);
    };

    if (isOpen) {
      router.events.on("routeChangeStart", handleRouteChange);

      // If the component is unmounted, unsubscribe with off method
      return () => {
        router.events.off("routeChangeStart", handleRouteChange);
      };
    }
  }, [isOpen]);

  return (
    <Box {...props}>
      <InstantSearch searchClient={searchClient} indexName="dev_realbnb">
        <Configure hitsPerPage={4} />

        <Popover
          id="popover-search-bar"
          isOpen={isOpen}
          onClose={handleBlur}
          placement="bottom-start"
          autoFocus={false}
          closeOnBlur
        >
          <PopoverTrigger>
            <div>
              <AlgoliaSearchBox
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </PopoverTrigger>
          <Results>
            <PopoverContent borderRadius="lg">
              <StyledHits hitComponent={Hit} />
            </PopoverContent>
          </Results>
        </Popover>
      </InstantSearch>
    </Box>
  );
};

const Results = connectStateResults(({ searchResults, children }) =>
  searchResults && searchResults.nbHits > 0 ? <>{children}</> : <></>
);

const StyledHits = styled(Hits)`
  ul {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    list-style: none;
  }
`;
