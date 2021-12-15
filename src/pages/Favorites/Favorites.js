import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { useFavoritesFetch } from "hooks";
import * as S from "./style";

const Favorites = () => {
  const { users, isLoading } = useFavoritesFetch();

  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder - Favorites
          </Text>
        </S.Header>
        <UserList users={users} isLoading={isLoading} />
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
