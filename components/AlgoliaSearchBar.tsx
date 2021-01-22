import {
  Box,
  Input,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import { HitComponent } from "./common/HitComponent";
import { AlgoliaSearchBox } from "./SearchBox";
import { useState } from "react";
import styled from "@emotion/styled";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_KEY
);

const StyledHits = styled(Hits)`
  ul {
    list-style: none;
  }
`;
export const AlgoliaSearchBar = () => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <InstantSearch searchClient={searchClient} indexName="dev_realbnb">
      <Popover
        autoFocus={false}
        closeOnBlur={true}
        isOpen={isFocus}
        placement="bottom"
      >
        <PopoverTrigger>
          <AlgoliaSearchBox setIsPopOpen={setIsFocus} />
        </PopoverTrigger>
        <PopoverContent>
          <StyledHits hitComponent={HitComponent} />
        </PopoverContent>
      </Popover>
    </InstantSearch>
  );
};
