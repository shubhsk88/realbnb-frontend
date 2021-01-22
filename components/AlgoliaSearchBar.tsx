import { Popover, PopoverTrigger, PopoverContent, Box } from "@chakra-ui/react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
} from "react-instantsearch-dom";
import { HitComponent } from "./common/HitComponent";
import { AlgoliaSearchBox } from "./SearchBox";
import { ReactElement, useState } from "react";
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

export const AlgoliaSearchBar = (): ReactElement => {
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

  return (
    <InstantSearch searchClient={searchClient} indexName="dev_realbnb">
      <Configure hitsPerPage={4} />

      <Box>
        <Popover
          autoFocus={false}
          closeOnBlur={true}
          isOpen={isOpen}
          onClose={handleBlur}
          closeDelay={2000}
          placement="bottom-end"
        >
          <PopoverTrigger>
            <AlgoliaSearchBox
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChange={(e) => handleInputChange(e)}
            />
          </PopoverTrigger>
          <PopoverContent top={8} left={30}>
            <StyledHits hitComponent={HitComponent} />
          </PopoverContent>
        </Popover>
      </Box>
    </InstantSearch>
  );
};
