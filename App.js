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
  FlatList,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { View as MotiView } from "moti";

import { inject, observer } from "mobx-react";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function RenderText(props) {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.5, translateX: -100 }}
      animate={{ opacity: 1, scale: 1, translateX: 10 }}
      transition={{ type: "timing" }}
    >
      <Text selectable={true} style={styles.text}>
        {props.value}
      </Text>
    </MotiView>
  );
}

function App(props) {
  const { value, updateText, selves, addSelf, getSelfCount } = props.store;

  const [imageSource, setImageSource] = React.useState(null);
  const scrollViewRef = React.useRef();
  //const [text, setText] = React.useState("");
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
        addSelf({ type: "image", value: response.base64 });
      }
    });
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
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
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({ animated: true })
              }
              style={styles.scrollView}
            >
              <Text>Count: {getSelfCount}</Text>
              <Pressable
                style={styles.pressableText}
                onPress={() => selectImage()}
              >
                <Text>Image</Text>
              </Pressable>
              {selves.map((i, index) => {
                if (i.type === "text") {
                  return <RenderText key={index} value={i.value} />;
                } else if (i.type === "image") {
                  return (
                    <Image
                      key={index}
                      resizeMode={"cover"}
                      source={{
                        uri: `data:image/jpeg;base64,${i.value}`,
                      }}
                      style={{
                        height: 200,
                        width: 250,
                        borderRadius: 20,
                        margin: 5,
                      }}
                    />
                  );
                } else {
                  console.log("nothing");
                }
              })}
            </ScrollView>
            <View style={styles.inputView}>
              <View style={styles.inputHolder}>
                <TextInput
                  style={styles.textInput}
                  placeholder="type self!"
                  onChangeText={(value) => updateText(value)}
                  value={value}
                />
                <Pressable
                  style={styles.pressableText}
                  onPress={() => addSelf({ type: "text", value: value })}
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f4ec" },
  scrollView: {
    flex: 1,
    width: windowWidth,
    height: 100,
    backgroundColor: "#f6f4ec",
  },
  text: {
    fontSize: 20,
    color: "#ffff",
    backgroundColor: "rgb(56, 133, 247)",
    margin: 5,
    borderRadius: 15,
    padding: 10,
    alignSelf: "flex-start",
    overflow: "hidden",
  },
  image: {
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 40,
    overflow: "hidden",
  },
  inputView: {
    width: windowWidth,
    height: 60,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "#f6f4ec",
  },
  inputHolder: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    padding: 10,
    height: 50,
    width: windowWidth - 40,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: "center",
  },
  pressableText: { alignSelf: "center" },
  pressable: {},
});

export default inject("store")(observer(App));
