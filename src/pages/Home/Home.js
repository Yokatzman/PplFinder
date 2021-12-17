import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import { useFavoritesFetch } from "hooks";

import * as S from "./style";

const Home = () => {
  const { users, isLoading } = usePeopleFetch();
  const { favorites, isLoading2 } = useFavoritesFetch();
  var firstmap = {}
  favorites.forEach(favorite => {
    var found = false;
    users.forEach(user => {
      if (user.login.uuid == favorite.login.uuid) {
        firstmap[user.login.uuid] = true;
      }
      user['favorite'] = found;
      found = false
    })
  })

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} isLoading={isLoading} favorites={favorites} firstMap={firstmap} />
      </S.Content>
    </S.Home>
  );
};

export default Home;
