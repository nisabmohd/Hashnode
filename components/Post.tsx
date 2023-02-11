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

export default function Post({
  username,
  image,
  title,
  breif,
  timestamp,
}: postProps): JSX.Element {
  return (
    <View
      style={{
        backgroundColor: '#e4e5f1',
        width: '96%',
        borderRadius: 8,
        marginTop: 12,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 15,
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
              color: 'black',
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
            color: 'black',
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
