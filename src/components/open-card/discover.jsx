import React, { useContext } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import styles from '../../screens/braserri/styles';
import i18n from '../../li8n';
import Context from '../../contextApi/context';

const Discover = () => {
  const { localizationContext } = useContext(Context);

  const images = [
    {
      image:
        'https://images.unsplash.com/photo-1639815188498-e23242c9c796?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8Q0R3dXdYSkFiRXd8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    },
    {
      image:
        'https://images.unsplash.com/photo-1639815188498-e23242c9c796?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8Q0R3dXdYSkFiRXd8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    },
  ];

  return (
    <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
      <Text style={styles.mainHeading}>
        {localizationContext.t('discover')}
      </Text>
      <View>
        {images.length ? (
          <FlatList
            data={images}
            showsVerticalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            //   scrollEnabled={false}
            alwaysBounceVertical={false}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={v => (
              <TouchableOpacity activeOpacity={0.4} style={{ marginTop: 10 }}>
                <Image
                  source={{
                    uri:
                      'https://images.unsplash.com/photo-1639815188498-e23242c9c796?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8Q0R3dXdYSkFiRXd8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
                  }}
                  style={{
                    width: 170,
                    height: 180,
                    resizrMode: 'contain',
                    borderRadius: 10,
                    marginRight: 20,
                    marginVertical: 14,
                  }}
                />
              </TouchableOpacity>
            )}
          />
        ) : (
          <View
            style={{
              width: 170,
              height: 180,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#DADADA',
              borderWidth: 1,
              borderStyle: 'dashed',
              marginTop: 20,
              padding: 20,
              marginBottom: 14,
            }}
          >
            <Text
              style={{
                fontFamily: 'ProximaNovaBold',
                fontSize: 15,
                textAlign: 'center',
              }}
            >
              {i18n.t('discover_msg')}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Discover;
