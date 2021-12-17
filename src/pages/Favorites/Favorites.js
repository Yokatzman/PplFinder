import React from "react";
import Text from "components/Text";
//import UserList from "components/UserList";
import FavoritesList from "components/FavoritesList";

import { useFavoritesFetch } from "hooks";
import * as S from "./style";

const Favorites = () => {
  const { favorites, isLoading } = useFavoritesFetch();
  var firstMap={}
  favorites.forEach(element=>{
    firstMap[element.login.uuid]=true;
  })
  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder - Favorites
          </Text>
        </S.Header>
        <FavoritesList users={favorites} isLoading={isLoading} favorites={favorites} firstMap={firstMap} />
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
