import React from 'react';
import { View, Button, Alert } from 'react-native';

const FileUpload = ({ onFileUpload }) => {
  const handleFileUpload = async () => {
    // For web, we can use a simple input element.
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            onFileUpload({ file: file });
            Alert.alert('Success', 'File uploaded successfully');
          } else {
            Alert.alert('Error', 'File upload failed');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          Alert.alert('Error', 'An unexpected error occurred');
        }
      }
    };
    input.click();
  };

  return (
    <View>
      <Button title="Upload PDF" onPress={handleFileUpload} />
    </View>
  );
};

export default FileUpload;