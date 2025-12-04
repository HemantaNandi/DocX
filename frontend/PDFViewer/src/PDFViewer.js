import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, Dimensions, ScrollView } from 'react-native';
import { Document, Page, pdfjs } from 'react-pdf';
import Thumbnail from './Thumbnail';

const PDFViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const zoomIn = () => {
    setZoom(zoom + 0.1);
  };

  const zoomOut = () => {
    if (zoom > 0.2) {
      setZoom(zoom - 0.1);
    }
  };

  const onThumbnailClick = (page) => {
    setPageNumber(page);
  };

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Button title="Prev" onPress={goToPrevPage} disabled={pageNumber === 1} />
        <Text>
          Page {pageNumber} of {numPages}
        </Text>
        <Button
          title="Next"
          onPress={goToNextPage}
          disabled={pageNumber === numPages}
        />
        <Button title="Zoom In" onPress={zoomIn} />
        <Button title="Zoom Out" onPress={zoomOut} />
      </View>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <View style={styles.pdfContainer}>
          <Page pageNumber={pageNumber} scale={zoom} />
        </View>
        <View style={styles.thumbnailContainer}>
          <ScrollView horizontal>
            {Array.from(new Array(numPages), (el, index) => (
              <Thumbnail
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={0.2}
                onThumbnailClick={onThumbnailClick}
              />
            ))}
          </ScrollView>
        </View>
      </Document>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdfContainer: {
    flex: 1,
    width: '100%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  pdf: {
    flex: 1,
    width: width,
  },
  thumbnailContainer: {
    marginTop: 10,
  },
});

export default PDFViewer;