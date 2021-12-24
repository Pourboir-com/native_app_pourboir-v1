import React, { useContext } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Image } from 'react-native';
import styles from '../../screens/braserri/styles';
import i18n from '../../li8n';
import Context from '../../contextApi/context';

const Discover = ({ data, loading }) => {
  const { localizationContext } = useContext(Context);

  return (
    <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
      <Text style={styles.mainHeading}>
        {localizationContext.t('discover')}
      </Text>
      <View>
        {!data?.length && loading ? (
          <View
            style={{
              width: 170,
              height: 180,
              borderRadius: 10,
              marginRight: 20,
              marginVertical: 14,
              marginTop: 10,
              backgroundColor: '#f0f0f0',
            }}
          />
        ) : data?.length ? (
          <FlatList
            data={data || []}
            showsVerticalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            //   scrollEnabled={false}
            alwaysBounceVertical={false}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={itemData => (
              <Image
                source={{
                  uri: itemData.item.media_url || itemData.item,
                }}
                style={{
                  width: 170,
                  height: 180,
                  resizeMode: 'cover',
                  borderRadius: 10,
                  marginRight: 20,
                  marginVertical: 14,
                  marginTop: 10,
                  backgroundColor: '#f0f0f0',
                }}
              />
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
