import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import axios from 'axios'
const api = axios.create({
  baseURL: "http://localhost:3002/results"
})
const UserList = ({ users, isLoading }) => {

  
  const [hoveredUserId, setHoveredUserId] = useState();

  const [countriesChecked, setCountriesChecked] = useState({
    Brazil: false,
    Australia: false,
    Canada: false,
    Germany: false,
    France: false,
    numChecked: 0
  });

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };
  const addFavorite = (userData)=>{
    //console.log(userData);
    /*console.log('adddd');
    api.get('/').then(res=>{
      console.log(res.data);
    })
    delete userData['id'];
    console.log(userData);

    //api.post('', JSON.stringify({userData}));
    var stringified = JSON.stringify(userData)
    api.post('/', stringified, {
      headers: {
    // Overwrite Axios's automatically set Content-Type
    'Content-Type': 'application/json',
    'accept': "application/json"
     }
    }).catch(err=>{console.log(err)});*/

    api.get('/').then(res=>{
      console.log(res);
      let filtered= Object.values(res.data).filter(user=>user.login.uuid == userData.login.uuid);
      /*if (filtered.length != 0){
        api.delete(filtered[0].id)
      }*/
      console.log(filtered);
      var n = ''+filtered[0].id
      api.delete(n);
    })

    
  }
  const handleCheckBox = (country) => {
    console.log(country);
    let label = ""
    switch(country){
      case "BR":
        label = "Brazil"
        break;
      case "AU":
        label = "Australia"
        break;
      case "CA":
        label = "Canada"
        break;
      case "DE":
        label = "Germany"
        break;
      case "FR":
        label = "France"
        break;
    }
    
  
    let newChecked = Object.assign({},countriesChecked);
    newChecked[label] = !countriesChecked[label];

    console.log(label + ' is ' + countriesChecked[label]);
    if (countriesChecked[label]==true){
      newChecked['numChecked'] = countriesChecked['numChecked']-1;
    } else{
      newChecked['numChecked'] = countriesChecked['numChecked']+1
    }
    console.log(newChecked);
    setCountriesChecked(newChecked);
  }
  
  return (
    <S.UserList>
      <S.Filters>
        <CheckBox onChange={handleCheckBox} value="BR" label="Brazil" />
        <CheckBox onChange={handleCheckBox} value="AU" label="Australia" />
        <CheckBox onChange={handleCheckBox} value="CA" label="Canada" />
        <CheckBox onChange={handleCheckBox} value="DE" label="Germany" />
        <CheckBox onChange={handleCheckBox} value="FR" label="France" />
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          if (countriesChecked[user.location.country] == true || countriesChecked['numChecked']==0){
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
              <S.IconButtonWrapper isVisible={index === hoveredUserId}>
                <IconButton >
                  <FavoriteIcon onClick={()=>{
                    console.log('favoriteeee')
                    addFavorite(user);
                  }} color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );} else return null;
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

export default UserList;
