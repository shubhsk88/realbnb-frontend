import { Input } from "@chakra-ui/react";
import { createConnector } from "react-instantsearch-dom";

const connectWithQuery = createConnector({
  displayName: "WidgetWithQuery",
  getProvidedProps(props, searchState) {
    // Since the `attributeForMyQuery` searchState entry isn't
    // necessarily defined, we need to default its value.
    const currentRefinement = searchState.attributeForMyQuery || "";

    // Connect the underlying component with the `currentRefinement`
    return { currentRefinement };
  },
  refine(props, searchState, nextRefinement) {
    // When the underlying component calls its `refine` prop,
    // we update the searchState with the provided refinement.
    return {
      // `searchState` represents the search state of *all* widgets. We need to extend it
      // instead of replacing it, otherwise other widgets will lose their respective state.
      ...searchState,
      attributeForMyQuery: nextRefinement,
    };
  },
  getSearchParameters(searchParameters, props, searchState) {
    // When the `attributeForMyQuery` state entry changes, we update the query
    return searchParameters.setQuery(searchState.attributeForMyQuery || "");
  },
  cleanUp(props, searchState) {
    // When the widget is unmounted, we omit the entry `attributeForMyQuery`
    // from the `searchState`, then on the next request the query will
    // be empty
    const { attributeForMyQuery, ...nextSearchState } = searchState;

    return nextSearchState;
  },
});

const MySearchBox = ({ currentRefinement, refine, setIsPopOpen }: any) => {
  const onFocusChange = (e) => {
    if (e.target.value.length > 0) {
      setIsPopOpen(true);
    }
  };
  const onBlur = () => {
    setIsPopOpen(false);
  };
  const onChange = (e) => {
    refine(e.currentTarget.value);
    if (e.target.value.length) {
      setIsPopOpen(true);
    }
  };

  return (
    <Input
      type="input"
      onBlur={onBlur}
      onFocus={onFocusChange}
      value={currentRefinement}
      onChange={onChange}
    />
  );
};

export const AlgoliaSearchBox = connectWithQuery(MySearchBox);
