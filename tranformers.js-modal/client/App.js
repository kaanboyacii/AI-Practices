import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);

  const handleClassify = async () => {
    try {
      const response = await fetch(`http://172.20.160.1:3000/classify?text=${encodeURIComponent(inputText)}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text>Text Classification</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text for classification"
        onChangeText={(text) => setInputText(text)}
        value={inputText}
      />
      <Button title="Classify" onPress={handleClassify} />
      {result && (
        <View>
          <Text>Result:</Text>
          <Text>{JSON.stringify(result, null, 2)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5,
    width: '80%',
  },
});