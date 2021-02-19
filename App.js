import React from 'react';
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
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App: () => React$Node = () => {
  const [value, onChangeText] = React.useState('Useless Placeholder');
  const [selves, createSelf] = React.useState(['Monday', 'Tuesday']);

  function addItem(text) {
    //const newTodos = [...selves, value];
    //createSelf(newTodos);
    if (value != '') {
      createSelf(selves.concat(text));
      onChangeText('');
    }
  }
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#f6f4ec'}}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              width: windowWidth,
              height: windowHeight,
            }}>
            <ScrollView
              style={{
                flex: 1,
                width: windowWidth,
                height: 100,
                backgroundColor: '#f6f4ec',
              }}>
              {selves.map((i) => (
                <Text
                  selectable={true}
                  style={{
                    color: '#ffff',
                    backgroundColor: 'rgb(56, 133, 247)',
                    margin: 1,
                    borderRadius: 25,
                    padding: 20,
                    alignSelf: 'flex-start',
                    overflow: 'hidden',
                  }}>
                  {i}
                </Text>
              ))}
            </ScrollView>
            <View
              style={{
                width: windowWidth,
                height: 60,
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: 'lightgray',
                backgroundColor: '#f6f4ec',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  style={{
                    height: 50,
                    width: windowWidth - 40,
                    borderColor: 'lightgray',
                    borderWidth: 1,
                    borderRadius: 50,
                    alignSelf: 'center',
                  }}
                  onChangeText={(text) => onChangeText(text)}
                  value={value}
                />
                <Pressable
                  style={{alignSelf: 'center'}}
                  onPress={() => addItem(value)}>
                  <Text>Send</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
