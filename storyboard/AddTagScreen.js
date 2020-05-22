import React from "react";
import AddTag from "../components/tags/AddTag";
import NavWrapper from "../components/common/NavWrapper";

export default function AddTagScreen({ tags, dispatch, navigation }) {
  return (
    <NavWrapper navigation={navigation}>
      <AddTag
        tags={tags}
        onPressAddTag={(newTag) =>
          dispatch({ type: "addTag", payload: newTag })
        }
      />
    </NavWrapper>
  );
}
