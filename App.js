import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Image,
  Dimensions,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

import { inject, observer } from "mobx-react";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function App(props) {
  const {
    value,
    updateText,
    selves,
    addSelf,
    getSelfCount,
    addPhoto,
    photos,
  } = props.store;

  const [imageSource, setImageSource] = React.useState(null);

  function selectImage() {
    let options = {
      title: "You can choose one image",
      maxWidth: 256,
      maxHeight: 256,
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
      },
    };

    launchImageLibrary(options, (response) => {
      console.log({ response });

      if (response.didCancel) {
        console.log("User cancelled photo picker");
        Alert.alert("You did not select any image");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        setImageSource(response.base64);
        addPhoto(response.base64);
        console.log({ source });
      }
    });
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f4ec" }}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              width: windowWidth,
              height: windowHeight,
            }}
          >
            <ScrollView
              style={{
                flex: 1,
                width: windowWidth,
                height: 100,
                backgroundColor: "#f6f4ec",
              }}
            >
              <Text>Count: {getSelfCount}</Text>
              <Pressable
                style={{ alignSelf: "center" }}
                onPress={() => selectImage()}
              >
                <Text>Image</Text>
              </Pressable>
              {/* <Image
                source={{
                  uri: `data:image/jpeg;base64,${imageSource}`,
                }}
                style={{ height: 200, width: 250 }}
              /> */}
              {selves.map((i, index) => (
                <Text
                  key={index}
                  selectable={true}
                  style={{
                    fontSize: 20,
                    color: "#ffff",
                    backgroundColor: "rgb(56, 133, 247)",
                    margin: 2,
                    borderRadius: 15,
                    padding: 10,
                    alignSelf: "flex-start",
                    overflow: "hidden",
                  }}
                >
                  {i}
                </Text>
              ))}
              {photos.map((i, index) => (
                <Image
                  key={index}
                  style={{
                    borderColor: "red",
                    borderWidth: 2,
                    borderRadius: 40,
                    overflow: 'hidden',
                  }}
                  resizeMode={"cover"}
                  source={{
                    uri: `data:image/jpeg;base64,${i}`,
                  }}
                  style={{ height: 200, width: 250 }}
                />
              ))}
            </ScrollView>
            <View
              style={{
                width: windowWidth,
                height: 60,
                alignSelf: "center",
                borderWidth: 1,
                borderColor: "lightgray",
                backgroundColor: "#f6f4ec",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  style={{
                    height: 50,
                    width: windowWidth - 40,
                    borderColor: "lightgray",
                    borderWidth: 1,
                    borderRadius: 50,
                    alignSelf: "center",
                  }}
                  placeholder="Type here to translate!"
                  value={value}
                  onChangeText={updateText}
                />
                <Pressable
                  style={{ alignSelf: "center" }}
                  onPress={() => addSelf(value)}
                >
                  <Text>Send</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});

export default inject("store")(observer(App));
