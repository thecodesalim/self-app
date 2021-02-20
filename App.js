import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Pressable,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";


import { inject, observer } from "mobx-react";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function App(props) {
  const { value, updateText, selves, addSelf, getCount } = props.store;
 
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
              <Text>Count: {getCount}</Text>
              {selves.map((i) => (
                <Text
                  selectable={true}
                  style={{
                    fontSize: 20,
                    color: "#ffff",
                    backgroundColor: "rgb(56, 133, 247)",
                    margin: 2,
                    borderRadius:15,
                    padding: 10,
                    alignSelf: "flex-start",
                    overflow: "hidden",
                  }}
                >
                  {i}
                </Text>
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
