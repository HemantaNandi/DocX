import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import FileUpload from './src/FileUpload';
import PDFViewer from './src/PDFViewer';
const App = () => {
  const [pdfSource, setPdfSource] = useState(null);

  const handleFileUpload = (source) => {
    setPdfSource(source);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>PDF Viewer</Text>
      {pdfSource ? (
        <View>
          <PDFViewer file={pdfSource.file} />
          <Button title="Back" onPress={() => setPdfSource(null)} />
        </View>
      ) : (
        <FileUpload onFileUpload={handleFileUpload} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
