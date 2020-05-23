import React, { useState } from "react";
import AddTag from "../components/tags/AddTag";
import NavWrapper from "../components/common/NavWrapper";

export default function AddTagScreen({ tags, dispatch, navigation }) {
  const [ name, setName ] = useState('');
  const [ color, setColor ] = useState('blue');
  return (
    <NavWrapper navigation={navigation} title="New Tag" rightButton={{ title: 'Save', onPress: () => {
      if (name.trim() !== '') {
        dispatch({ type: "addTag", payload: { id: tags.length, name, color } });
        navigation.goBack();
      }
    }}}>
      <AddTag
        name={name}
        onChangeName={setName}
        color={color}
        onChangeColor={setColor}
      />
    </NavWrapper>
  );
}
