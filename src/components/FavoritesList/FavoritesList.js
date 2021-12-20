import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import axios from 'axios'
const api = axios.create({
  baseURL: "https://ppldb.herokuapp.com/results"
})
const FavoritesList = ({ users, isLoading }) => {


  const [favoritesList, setFavoritesList] = useState(users);
  useEffect(() => { setFavoritesList(users) }, [users]);



  const [hoveredUserId, setHoveredUserId] = useState();

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };
  const DeleteFavorite = (userData) => {
    var newList = favoritesList.slice();


    api.get('/').then(res => {
      let filtered = Object.values(res.data).filter(user => user.login.uuid == userData.login.uuid);
      if (filtered.length > 0) {
        var delId = '' + filtered[0].id
        var _index = 0;
        favoritesList.forEach((fav, index) => {
          if (fav.login.uuid == userData.login.uuid) {
            _index = index;
          }
        })
        newList.splice(_index, 1);
        setFavoritesList(newList);
        api.delete(delId);
      }
    })




  }
  return (
    <S.UserList>
      <S.List>
        {favoritesList.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={true}>
                <IconButton >
                  <FavoriteIcon onClick={() => {
                    DeleteFavorite(user);
                  }} color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );

        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default FavoritesList;
