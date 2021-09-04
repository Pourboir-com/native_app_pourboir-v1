import React, {useRef} from 'react'
import { Dimensions, ImageBackground, Text, View,Image, TouchableOpacity } from 'react-native'
import GlobalHeader from '../../components/GlobalHeader'
import i18n from '../../li8n'
import styles from './styles'
import RatingStar from '../../components/RatingComponent';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Colors } from '../../constants/Theme'
import RBSheet from "react-native-raw-bottom-sheet";
import { Button } from 'react-native-elements'

const PublicProfile = ({route, navigation}) => {
    const {user} = route.params;
    const obj = [1, 2, 3, 4, 5];
    const refRBSheet = useRef();
    return (
        <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{
            width: '100%',
            height: 100,
            borderBottomLeftRadius: Dimensions.get('window').width * 0.06,
            borderBottomRightRadius: Dimensions.get('window').width * 0.06,
            overflow: 'hidden',
          }}
          source={require('../../assets/images/Group3.png')}
        >
          <GlobalHeader
            arrow={true}
            headingText={`@${user.name}`}
            fontSize={17}
            color={'black'}
            navigation={navigation}
            setting={false}
            backgroundColor={'transparent'}
            borderRadius={true}
            menu={true}
            menuBtn={() => refRBSheet.current.open()}
          />
        </ImageBackground>
      </View>
      <View style={{ flex: 7}}>
        <View style={{marginTop:25, marginHorizontal:'5%',}}>
            {/* Section 1  */}
            <View style={styles.userDetails_container}>
            <View>
                <Image  
                    source={require('../../assets/images/Avatar.png')}
                    style={{width:140, height:170, resizeMode:'contain'}}
                />
            </View>
            <View style={{marginLeft:20, marginTop:10 }}>
                <Text style={styles.user_name}>{user.name}</Text>
                <Text style={styles.clientTxt}>Client</Text>
                <View style={{ flexDirection: 'row', marginTop: 7 }}>
              {obj.map((v, i) => {
                return (
                  <TouchableOpacity style={{ marginRight: 3 }} key={i}>
                    <RatingStar
                      starSize={20}
                      type={
                        v >= 0 ? 'filled' : v === 4 + 0.5 ? 'half' : 'empty'
                      }
                    
                      notRatedStarColor="#f1f1f1"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
                <Text style={styles.few_word_text}>Few words about him/her</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:15,}}>
                    <View>
                        <Text style={styles.subscribeNumber}>888</Text>
                        <Text style={styles.subscribeTxt}>Subscribers</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} style={styles.btn_follow}>
                        <Text style={styles.text_follow}>Follow</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            {/* Section 2  */}
            <View style={{marginTop:25}}>
               <View>
               <TouchableOpacity style={styles.publications_btn}>
                <FontAwesome name="send" size={18} color={Colors.yellow} />
                    <Text style={styles.publication_text}>Publications</Text>
                </TouchableOpacity>
               </View>
               <View style={{marginTop:25, flexDirection:'row'}}>
                    <View>
                        <Image 
                        style={{width:65, height:65, resizeMode:'contain'}}
                        source={require('../../assets/images/ads.png')}
                        />
                    </View>
                    <View style={{marginLeft:8}}>
                        <Text style={styles.publication_text}>No Publications.</Text>
                        <Text style={styles.publication_text}>
                        There is no publications yet on this account. Follow to receive exclusive content soon. 
                        </Text>
                    </View>
               </View>
            </View>
        </View>
      </View>
      {/* Bottom SHeet  */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={500}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.6)"
          },
          draggableIcon: {
            backgroundColor: "#D8D8D8"
          }
        }}
      >
        <View style={{marginHorizontal:24, marginTop:15}}>
            <TouchableOpacity onPress={() => navigation.navigate('personalDetails')} activeOpacity={0.3} style={styles.sheet_elements}>
                <Text style={styles.sheetTxt}>Modify your profile</Text>
                <AntDesign name="right"  size={18} color="#485460" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("YourTickets")} activeOpacity={0.3} style={styles.sheet_elements}>
                <Text style={styles.sheetTxt}>Your Tickets</Text>
                <AntDesign name="right" size={18} color="#485460" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.3} style={styles.sheet_elements}>
                <Text style={styles.sheetTxt}>Your bank account</Text>
                <AntDesign name="right" size={18} color="#485460" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.3} style={styles.sheet_elements}>
                <Text style={styles.sheetTxt}>Language</Text>
                <AntDesign name="right" size={18} color="#485460" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.3} style={styles.sheet_elements}>
                <Text style={styles.sheetTxt}>Rate this applicaiton</Text>
                <AntDesign name="right" size={18} color="#485460" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.3} style={styles.sheet_elements}>
                <Text style={styles.sheetTxt}>Contact us </Text>
                <AntDesign name="right" size={18} color="#485460" />
            </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.signOutBtn}>
                <Text style={{...styles.sheetTxt, textAlign:'center',}}>Sign Out</Text>
            </TouchableOpacity>
      </RBSheet>
    </View>
    )
}

export default PublicProfile


