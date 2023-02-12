import {View, Text, Image} from 'react-native';
import React from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

type postProps = {
  image: string;
  breif: string;
  username: string;
  title: string;
  timestamp: string;
};

export default function Postcard({
  username,
  image,
  title,
  breif,
  timestamp,
}: postProps): JSX.Element {
  return (
    <View
      style={{
        width: '98%',
        marginTop: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 15,
        marginBottom: 1,
        borderBottomColor: '#1b1c27',
        borderBottomWidth: 2,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}>
        <Image
          style={{width: 40, height: 40, borderRadius: 50}}
          source={{
            uri: image!,
          }}
        />
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              fontFamily: 'Poppins',
              color: 'white',
            }}>
            {username!}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Poppins',
              color: '#a8aab4',
              marginTop: -5,
            }}>
            {timeAgo.format(Date.parse(timestamp))}
            {}
          </Text>
        </View>
      </View>
      <View id="breif">
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 25,
            marginTop: 10,
          }}>
          {title!}
        </Text>
        <Text style={{fontSize: 18, color: 'gray'}}>{breif!}</Text>
      </View>
    </View>
  );
}
