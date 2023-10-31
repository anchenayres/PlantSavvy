import React, { useState } from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView } from 'react-native';


const NewScreen = () => {
  const faqs = [
    { question: 'What kind of plants can you identifiy?', answer: 'Our machine-learning model is mainly based on photos that we have collected over the past eight years of running the PlantSavvy app. The data includes photos of wild, garden and indoor plants, as well as weeds and crops. We can currently identify more than 33,000 plant species of various life forms, including trees, shrubs and herbs. Our database also includes the most common fungi, lichens and mosses.' },
    { question: 'What is the license of the content you provide?', answer: 'In general, we provide our clients with content that is mostly in the public domain. The only exception is similar images that are owned by us. 70% of these images are subject to a license described in our T&C. The remaining 30% are images under the CC-BY license, which requires that the author’s name and license name be included with the image. Sometimes the license doesn’t allow any kind of remixing (indicated by the SA element). We have made sure that all content can be used for commercial purposes. Details of the license can be found in our terms and conditions.We are currently working with no more than these licenses: CC0, CC BY 2.0, CC BY 2.5, CC BY 3.0, CC BY 4.0, CC BY-SA 2.0, CC BY-SA 2.5, CC BY-SA 3.0, CC BY-SA 4.0' },
    { question: 'Sometimes the result incorrectly says that the plant is healthy or identifies an incorrect disease. Am I doing something wrong?', answer: 'Diagnosing plant health is often a complex task. For example, if a plant is consistently overwatered, it is also unable to use nutrients effectively, so it will develop symptoms of both overwatering and nutrient deficiency. Therefore, when implementing this functionality, we recommend that you list more than one possible cause of disease in the result. However, you can also improve the result by taking a photo from of a diseased part of a plant for best results. Some diseases have symptoms that are less visible (e.g. small pests), and the detail is crucial for correct identification.' },
    { question: 'What is the list of all categories of disease to expect?', answer: '28 classes of fungal diseases, 18 classes of abiotic disorders, 17 classes of pests, 7 classes of chromista, 5 classes of viruses, and 5 classes of bacterial diseases ' },
    { question: 'How can I improve accuracy?', answer: 'Include multiple photos of a single plant in the plant identification request. Include GPS coordinates.' },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpansion = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
<View style={styles.container}>
    <Text style={styles.heading}>FAQs</Text>

      {faqs.map((faq, index) => (
        <View key={index} style={{ marginBottom: 20, left: 20, top: 0 }}>
          <TouchableOpacity onPress={() => toggleExpansion(index)}>
            <Text style={styles.question}>
              {faq.question} {expandedIndex === index ? '▼' : '▲'}
            </Text>
          </TouchableOpacity>
          {expandedIndex === index && (
            <Text style={{ marginTop: 20, width: 400, color: 'grey' }}>
              {faq.answer}
            </Text>
          )}
        </View>
      ))}
    </View>  
    );
};

export default NewScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 100, 
    },
    heading:{
        fontWeight: 'bold',
        fontSize: 24,
        top: -60,
        left: 20,
      },
      question:{
        fontSize: 16, 
        color: '#0B4D21', 
        width: 390, 
        borderRadius: 5,
      },
});
