import React, { useContext } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import styles from '../../screens/braserri/styles';
import i18n from '../../li8n';
import Context from '../../contextApi/context';

const Discover = ({ data }) => {
  const { localizationContext } = useContext(Context);

  return (
    <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
      <Text style={styles.mainHeading}>
        {localizationContext.t('discover')}
      </Text>
      <View>
        {data?.data?.data?.length ? (
          <FlatList
            data={data?.data?.data || []}
            showsVerticalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            //   scrollEnabled={false}
            alwaysBounceVertical={false}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={itemData => (
              <TouchableOpacity activeOpacity={0.4} style={{ marginTop: 10 }}>
                <Image
                  source={{
                    uri: itemData.item.media_url,
                  }}
                  style={{
                    width: 170,
                    height: 180,
                    resizeMode: 'contain',
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
